export interface FileNode {
  name: string
  type: 'file' | 'folder'
  tag?: string
  content?: string
  children?: FileNode[]
}

function getArchModule(archId: string): { name: string; content: string } {
  switch (archId) {
    case 'risc-v':
      return {
        name: 'riscv_core',
        content: `module riscv_core (
  input  wire        clk,
  input  wire        rst_n,
  input  wire [31:0] instr,
  input  wire [31:0] mem_rdata,
  output wire [31:0] mem_addr,
  output wire [31:0] mem_wdata,
  output wire        mem_we
);

  // RV32I Core — Fetch, Decode, Execute
  reg [31:0] pc;
  reg [31:0] regfile [0:31];
  
  wire [6:0]  opcode = instr[6:0];
  wire [4:0]  rd     = instr[11:7];
  wire [2:0]  funct3 = instr[14:12];
  wire [4:0]  rs1    = instr[19:15];
  wire [4:0]  rs2    = instr[24:20];
  wire [6:0]  funct7 = instr[31:25];

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      pc <= 32'h0000_0000;
    end else begin
      pc <= pc + 4;
    end
  end

  assign mem_addr  = pc;
  assign mem_wdata = 32'b0;
  assign mem_we    = 1'b0;

endmodule`,
      }
    case 'custom-fsm':
      return {
        name: 'fsm_controller',
        content: `module fsm_controller (
  input  wire       clk,
  input  wire       rst_n,
  input  wire [3:0] cmd,
  output reg  [7:0] status
);

  localparam IDLE    = 3'b000;
  localparam FETCH   = 3'b001;
  localparam DECODE  = 3'b010;
  localparam EXECUTE = 3'b011;
  localparam HALT    = 3'b100;

  reg [2:0] state, next_state;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      state <= IDLE;
    else
      state <= next_state;
  end

  always @(*) begin
    case (state)
      IDLE:    next_state = (cmd != 0) ? FETCH : IDLE;
      FETCH:   next_state = DECODE;
      DECODE:  next_state = EXECUTE;
      EXECUTE: next_state = (cmd == 4'hF) ? HALT : IDLE;
      HALT:    next_state = HALT;
      default: next_state = IDLE;
    endcase
  end

  always @(posedge clk) begin
    status <= {5'b0, state};
  end

endmodule`,
      }
    default:
      return {
        name: 'top_module',
        content: `module top_module (
  input  wire       clk,
  input  wire       rst_n,
  input  wire [7:0] data_in,
  output reg  [7:0] data_out
);

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      data_out <= 8'b0;
    else
      data_out <= data_in;
  end

endmodule`,
      }
  }
}

function getTestbench(moduleName: string, verif: string): string {
  const isCocotb = verif === 'cocotb'
  if (isCocotb) {
    return `# cocotb testbench for ${moduleName}
import cocotb
from cocotb.triggers import RisingEdge, Timer
from cocotb.clock import Clock

@cocotb.test()
async def test_reset(dut):
    """Test reset behavior"""
    clock = Clock(dut.clk, 10, units="ns")
    cocotb.start_soon(clock.start())
    
    dut.rst_n.value = 0
    await Timer(20, units="ns")
    dut.rst_n.value = 1
    await RisingEdge(dut.clk)
    
    # Add assertions here
    assert True, "Reset test passed"
`
  }
  return `\`timescale 1ns / 1ps

module ${moduleName}_tb;

  reg        clk;
  reg        rst_n;
  
  // Instantiate DUT
  ${moduleName} dut (
    .clk   (clk),
    .rst_n (rst_n)
  );

  // Clock generation — 100 MHz
  initial clk = 0;
  always #5 clk = ~clk;

  // Test sequence
  initial begin
    rst_n = 0;
    #20;
    rst_n = 1;
    
    // Test vectors
    #100;
    
    $display("Test completed");
    $finish;
  end

  // Waveform dump
  initial begin
    $dumpfile("${moduleName}_tb.vcd");
    $dumpvars(0, ${moduleName}_tb);
  end

endmodule`
}

function getConstraints(synth: string): string {
  if (synth?.startsWith('fpga')) {
    return `# Timing Constraints
create_clock -period 10.000 -name sys_clk [get_ports clk]

# I/O Constraints
set_input_delay -clock sys_clk 2.0 [all_inputs]
set_output_delay -clock sys_clk 2.0 [all_outputs]

# False paths
set_false_path -from [get_ports rst_n]
`
  }
  if (synth?.startsWith('asic')) {
    return `# SDC Constraints — ASIC
create_clock -name clk -period 10.0 [get_ports clk]
set_clock_uncertainty 0.1 [get_clocks clk]

set_input_delay 1.5 -clock clk [remove_from_collection [all_inputs] clk]
set_output_delay 1.5 -clock clk [all_outputs]

set_max_area 0
set_max_fanout 20 [current_design]
`
  }
  return `# Constraints placeholder
# Configure for your target
`
}

export function generateFolderStructure(specs: Record<string, string>): FileNode {
  const arch = getArchModule(specs.architecture || '')
  const moduleName = arch.name
  const verifType = specs.verification || 'basic-tb'
  const synthTarget = specs.synthesis || 'sim-only'
  const tbExt = verifType === 'cocotb' ? 'py' : 'v'
  const tbTag = verifType === 'cocotb' ? 'TB' : 'TB'

  const root: FileNode = {
    name: 'project_root',
    type: 'folder',
    children: [
      {
        name: 'rtl',
        type: 'folder',
        children: [
          {
            name: `${moduleName}.v`,
            type: 'file',
            tag: 'RTL',
            content: arch.content,
          },
          {
            name: 'alu.v',
            type: 'file',
            tag: 'RTL',
            content: `module alu (
  input  wire [31:0] a,
  input  wire [31:0] b,
  input  wire [3:0]  op,
  output reg  [31:0] result,
  output wire        zero
);

  always @(*) begin
    case (op)
      4'b0000: result = a + b;    // ADD
      4'b0001: result = a - b;    // SUB
      4'b0010: result = a & b;    // AND
      4'b0011: result = a | b;    // OR
      4'b0100: result = a ^ b;    // XOR
      4'b0101: result = a << b[4:0]; // SLL
      4'b0110: result = a >> b[4:0]; // SRL
      default: result = 32'b0;
    endcase
  end

  assign zero = (result == 32'b0);

endmodule`,
          },
          {
            name: 'register_file.v',
            type: 'file',
            tag: 'RTL',
            content: `module register_file (
  input  wire        clk,
  input  wire        we,
  input  wire [4:0]  rs1_addr,
  input  wire [4:0]  rs2_addr,
  input  wire [4:0]  rd_addr,
  input  wire [31:0] rd_data,
  output wire [31:0] rs1_data,
  output wire [31:0] rs2_data
);

  reg [31:0] regs [0:31];

  // x0 is hardwired to zero
  assign rs1_data = (rs1_addr == 0) ? 32'b0 : regs[rs1_addr];
  assign rs2_data = (rs2_addr == 0) ? 32'b0 : regs[rs2_addr];

  always @(posedge clk) begin
    if (we && rd_addr != 0)
      regs[rd_addr] <= rd_data;
  end

endmodule`,
          },
        ],
      },
      {
        name: 'tb',
        type: 'folder',
        children: [
          {
            name: `${moduleName}_tb.${tbExt}`,
            type: 'file',
            tag: tbTag,
            content: getTestbench(moduleName, verifType),
          },
          {
            name: `alu_tb.v`,
            type: 'file',
            tag: 'TB',
            content: getTestbench('alu', 'basic-tb'),
          },
        ],
      },
      {
        name: 'syn',
        type: 'folder',
        children: [
          {
            name: 'constraints.sdc',
            type: 'file',
            tag: 'SYN',
            content: getConstraints(synthTarget),
          },
          {
            name: 'synth.tcl',
            type: 'file',
            tag: 'SYN',
            content: `# Synthesis script
# Target: ${synthTarget}

read_verilog ../rtl/${moduleName}.v
read_verilog ../rtl/alu.v
read_verilog ../rtl/register_file.v

synth -top ${moduleName}

# Map to target
# abc -liberty lib/cells.lib

write_verilog -noattr synth_out.v
stat
`,
          },
        ],
      },
      {
        name: 'mem',
        type: 'folder',
        children: [
          {
            name: 'memory_map.txt',
            type: 'file',
            tag: 'MEM',
            content: `// Memory Map
// Address Range       | Region      | Size
// ----------------------------------------
// 0x0000_0000 - 0x0000_3FFF | ROM         | 16 KB
// 0x0001_0000 - 0x0001_FFFF | RAM         | 64 KB
// 0x4000_0000 - 0x4000_00FF | I/O Periph  |  256 B
// 0x8000_0000 - 0x8000_0003 | Control Reg |    4 B
`,
          },
        ],
      },
      {
        name: 'docs',
        type: 'folder',
        children: [
          {
            name: 'README.md',
            type: 'file',
            tag: 'DOC',
            content: `# ${moduleName} Project

Generated by EasyChip Playground.

## Specifications
- Architecture: ${specs.architecture || 'default'}
- Pipeline: ${specs.pipeline || 'default'}
- Memory: ${specs.memory || 'default'}
- Bus: ${specs.bus || 'default'}
- Clock: ${specs.clock || 'default'}
- I/O: ${specs.io || 'default'}
- Verification: ${specs.verification || 'default'}
- Synthesis: ${specs.synthesis || 'default'}
- Optimization: ${specs.optimization || 'default'}

## Structure
- \`rtl/\` — Synthesizable RTL modules
- \`tb/\` — Testbenches and verification
- \`syn/\` — Synthesis scripts and constraints
- \`mem/\` — Memory configuration
- \`docs/\` — Documentation
`,
          },
          {
            name: 'spec_sheet.md',
            type: 'file',
            tag: 'DOC',
            content: `# Specification Sheet

| Parameter       | Value          |
|-----------------|----------------|
| Architecture    | ${specs.architecture || '—'} |
| Pipeline        | ${specs.pipeline || '—'} |
| Memory          | ${specs.memory || '—'} |
| Bus Protocol    | ${specs.bus || '—'} |
| Clock Domain    | ${specs.clock || '—'} |
| I/O             | ${specs.io || '—'} |
| Verification    | ${specs.verification || '—'} |
| Synthesis       | ${specs.synthesis || '—'} |
| Optimization    | ${specs.optimization || '—'} |
`,
          },
        ],
      },
      {
        name: 'Makefile',
        type: 'file',
        tag: 'PKG',
        content: `# EasyChip Project Makefile

TOP = ${moduleName}
RTL = rtl/$(TOP).v rtl/alu.v rtl/register_file.v
TB  = tb/$(TOP)_tb.v

.PHONY: sim synth clean

sim:
\tiverilog -o sim.out $(RTL) $(TB)
\tvvp sim.out

synth:
\tyosys -s syn/synth.tcl

clean:
\trm -f sim.out *.vcd synth_out.v
`,
      },
    ],
  }

  return root
}
