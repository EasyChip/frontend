import { SPEC_CATEGORIES } from '@/lib/specs/spec-options'

export interface FileNode {
  name: string
  type: 'file' | 'folder'
  tag?: string
  content?: string
  children?: FileNode[]
}

/** Resolve a human-readable label for a spec selection */
function getSpecLabel(categoryId: string, optionId: string | undefined): string {
  if (!optionId) return '—'
  const cat = SPEC_CATEGORIES.find((c) => c.id === categoryId)
  const opt = cat?.options.find((o) => o.id === optionId)
  return opt?.label ?? optionId
}

function getModuleVerilog(moduleType: string): { name: string; content: string; supportFiles: FileNode[] } {
  switch (moduleType) {
    case 'uart_tx':
      return {
        name: 'uart_tx',
        content: `module uart_tx #(
  parameter BAUD_DIV = 868   // clk_freq / baud_rate (e.g. 100 MHz / 115200)
)(
  input  wire       clk,
  input  wire       rst_n,
  input  wire [7:0] tx_data,
  input  wire       tx_start,
  output reg        tx_out,
  output reg        tx_busy,
  output reg        tx_done
);

  localparam IDLE  = 2'b00;
  localparam START = 2'b01;
  localparam DATA  = 2'b10;
  localparam STOP  = 2'b11;

  reg [1:0]  state;
  reg [15:0] baud_cnt;
  reg [2:0]  bit_idx;
  reg [7:0]  shift_reg;

  wire baud_tick = (baud_cnt == 0);

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      state     <= IDLE;
      tx_out    <= 1'b1;
      tx_busy   <= 1'b0;
      tx_done   <= 1'b0;
      baud_cnt  <= 0;
      bit_idx   <= 0;
      shift_reg <= 8'b0;
    end else begin
      tx_done <= 1'b0;
      case (state)
        IDLE: begin
          tx_out <= 1'b1;
          if (tx_start) begin
            shift_reg <= tx_data;
            state     <= START;
            tx_busy   <= 1'b1;
            baud_cnt  <= BAUD_DIV - 1;
          end
        end
        START: begin
          tx_out <= 1'b0;  // start bit
          if (baud_tick) begin
            state    <= DATA;
            bit_idx  <= 0;
            baud_cnt <= BAUD_DIV - 1;
          end else begin
            baud_cnt <= baud_cnt - 1;
          end
        end
        DATA: begin
          tx_out <= shift_reg[0];
          if (baud_tick) begin
            shift_reg <= {1'b0, shift_reg[7:1]};
            if (bit_idx == 7) begin
              state    <= STOP;
              baud_cnt <= BAUD_DIV - 1;
            end else begin
              bit_idx  <= bit_idx + 1;
              baud_cnt <= BAUD_DIV - 1;
            end
          end else begin
            baud_cnt <= baud_cnt - 1;
          end
        end
        STOP: begin
          tx_out <= 1'b1;  // stop bit
          if (baud_tick) begin
            state   <= IDLE;
            tx_busy <= 1'b0;
            tx_done <= 1'b1;
          end else begin
            baud_cnt <= baud_cnt - 1;
          end
        end
      endcase
    end
  end

endmodule`,
        supportFiles: [],
      }

    case 'spi_master':
      return {
        name: 'spi_master',
        content: `module spi_master #(
  parameter CLK_DIV = 4,
  parameter DATA_WIDTH = 8
)(
  input  wire                  clk,
  input  wire                  rst_n,
  input  wire [DATA_WIDTH-1:0] mosi_data,
  input  wire                  start,
  output reg  [DATA_WIDTH-1:0] miso_data,
  output reg                   done,
  output reg                   busy,
  // SPI signals
  output reg                   sclk,
  output reg                   mosi,
  input  wire                  miso,
  output reg                   cs_n
);

  localparam IDLE    = 2'b00;
  localparam LEADING = 2'b01;
  localparam TRAILING= 2'b10;

  reg [1:0]  state;
  reg [15:0] clk_cnt;
  reg [3:0]  bit_cnt;
  reg [DATA_WIDTH-1:0] shift_out;
  reg [DATA_WIDTH-1:0] shift_in;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      state     <= IDLE;
      sclk      <= 1'b0;
      mosi      <= 1'b0;
      cs_n      <= 1'b1;
      done      <= 1'b0;
      busy      <= 1'b0;
      miso_data <= 0;
      clk_cnt   <= 0;
      bit_cnt   <= 0;
      shift_out <= 0;
      shift_in  <= 0;
    end else begin
      done <= 1'b0;
      case (state)
        IDLE: begin
          sclk <= 1'b0;
          cs_n <= 1'b1;
          if (start) begin
            shift_out <= mosi_data;
            shift_in  <= 0;
            bit_cnt   <= 0;
            cs_n      <= 1'b0;
            busy      <= 1'b1;
            mosi      <= mosi_data[DATA_WIDTH-1];
            clk_cnt   <= CLK_DIV / 2 - 1;
            state     <= LEADING;
          end
        end
        LEADING: begin
          if (clk_cnt == 0) begin
            sclk    <= 1'b1;
            shift_in <= {shift_in[DATA_WIDTH-2:0], miso};
            clk_cnt <= CLK_DIV / 2 - 1;
            state   <= TRAILING;
          end else begin
            clk_cnt <= clk_cnt - 1;
          end
        end
        TRAILING: begin
          if (clk_cnt == 0) begin
            sclk <= 1'b0;
            if (bit_cnt == DATA_WIDTH - 1) begin
              cs_n      <= 1'b1;
              miso_data <= {shift_in[DATA_WIDTH-2:0], miso};
              busy      <= 1'b0;
              done      <= 1'b1;
              state     <= IDLE;
            end else begin
              bit_cnt   <= bit_cnt + 1;
              shift_out <= {shift_out[DATA_WIDTH-2:0], 1'b0};
              mosi      <= shift_out[DATA_WIDTH-2];
              clk_cnt   <= CLK_DIV / 2 - 1;
              state     <= LEADING;
            end
          end else begin
            clk_cnt <= clk_cnt - 1;
          end
        end
        default: state <= IDLE;
      endcase
    end
  end

endmodule`,
        supportFiles: [],
      }

    case 'fifo_buffer':
      return {
        name: 'fifo_buffer',
        content: `module fifo_buffer #(
  parameter DATA_WIDTH = 8,
  parameter DEPTH      = 256
)(
  input  wire                  clk,
  input  wire                  rst_n,
  // Write port
  input  wire [DATA_WIDTH-1:0] wr_data,
  input  wire                  wr_en,
  output wire                  full,
  // Read port
  output wire [DATA_WIDTH-1:0] rd_data,
  input  wire                  rd_en,
  output wire                  empty,
  // Status
  output wire [$clog2(DEPTH):0] count
);

  localparam ADDR_W = $clog2(DEPTH);

  reg [DATA_WIDTH-1:0] mem [0:DEPTH-1];
  reg [ADDR_W:0] wr_ptr, rd_ptr;

  assign count = wr_ptr - rd_ptr;
  assign full  = (count == DEPTH);
  assign empty = (count == 0);
  assign rd_data = mem[rd_ptr[ADDR_W-1:0]];

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      wr_ptr <= 0;
      rd_ptr <= 0;
    end else begin
      if (wr_en && !full) begin
        mem[wr_ptr[ADDR_W-1:0]] <= wr_data;
        wr_ptr <= wr_ptr + 1;
      end
      if (rd_en && !empty) begin
        rd_ptr <= rd_ptr + 1;
      end
    end
  end

endmodule`,
        supportFiles: [],
      }

    case 'axi4_lite_slave':
      return {
        name: 'axi4_lite_slave',
        content: `module axi4_lite_slave #(
  parameter ADDR_WIDTH = 8,
  parameter DATA_WIDTH = 32,
  parameter NUM_REGS   = 16
)(
  input  wire                    aclk,
  input  wire                    aresetn,
  // Write address channel
  input  wire [ADDR_WIDTH-1:0]   s_axi_awaddr,
  input  wire                    s_axi_awvalid,
  output reg                     s_axi_awready,
  // Write data channel
  input  wire [DATA_WIDTH-1:0]   s_axi_wdata,
  input  wire [DATA_WIDTH/8-1:0] s_axi_wstrb,
  input  wire                    s_axi_wvalid,
  output reg                     s_axi_wready,
  // Write response channel
  output reg  [1:0]              s_axi_bresp,
  output reg                     s_axi_bvalid,
  input  wire                    s_axi_bready,
  // Read address channel
  input  wire [ADDR_WIDTH-1:0]   s_axi_araddr,
  input  wire                    s_axi_arvalid,
  output reg                     s_axi_arready,
  // Read data channel
  output reg  [DATA_WIDTH-1:0]   s_axi_rdata,
  output reg  [1:0]              s_axi_rresp,
  output reg                     s_axi_rvalid,
  input  wire                    s_axi_rready
);

  reg [DATA_WIDTH-1:0] reg_bank [0:NUM_REGS-1];
  reg [ADDR_WIDTH-1:0] aw_addr_latched;
  reg [ADDR_WIDTH-1:0] ar_addr_latched;
  integer i;

  // Write address handshake
  always @(posedge aclk or negedge aresetn) begin
    if (!aresetn) begin
      s_axi_awready <= 1'b0;
      aw_addr_latched <= 0;
    end else begin
      if (s_axi_awvalid && !s_axi_awready) begin
        s_axi_awready  <= 1'b1;
        aw_addr_latched <= s_axi_awaddr;
      end else begin
        s_axi_awready <= 1'b0;
      end
    end
  end

  // Write data
  always @(posedge aclk or negedge aresetn) begin
    if (!aresetn) begin
      s_axi_wready <= 1'b0;
      for (i = 0; i < NUM_REGS; i = i + 1)
        reg_bank[i] <= 0;
    end else begin
      if (s_axi_wvalid && !s_axi_wready) begin
        s_axi_wready <= 1'b1;
        reg_bank[aw_addr_latched[ADDR_WIDTH-1:2]] <= s_axi_wdata;
      end else begin
        s_axi_wready <= 1'b0;
      end
    end
  end

  // Write response
  always @(posedge aclk or negedge aresetn) begin
    if (!aresetn) begin
      s_axi_bvalid <= 1'b0;
      s_axi_bresp  <= 2'b00;
    end else begin
      if (s_axi_awready && s_axi_wready && !s_axi_bvalid) begin
        s_axi_bvalid <= 1'b1;
        s_axi_bresp  <= 2'b00;  // OKAY
      end else if (s_axi_bready && s_axi_bvalid) begin
        s_axi_bvalid <= 1'b0;
      end
    end
  end

  // Read address
  always @(posedge aclk or negedge aresetn) begin
    if (!aresetn) begin
      s_axi_arready   <= 1'b0;
      ar_addr_latched  <= 0;
    end else begin
      if (s_axi_arvalid && !s_axi_arready) begin
        s_axi_arready   <= 1'b1;
        ar_addr_latched  <= s_axi_araddr;
      end else begin
        s_axi_arready <= 1'b0;
      end
    end
  end

  // Read data
  always @(posedge aclk or negedge aresetn) begin
    if (!aresetn) begin
      s_axi_rvalid <= 1'b0;
      s_axi_rdata  <= 0;
      s_axi_rresp  <= 2'b00;
    end else begin
      if (s_axi_arready && !s_axi_rvalid) begin
        s_axi_rvalid <= 1'b1;
        s_axi_rdata  <= reg_bank[ar_addr_latched[ADDR_WIDTH-1:2]];
        s_axi_rresp  <= 2'b00;
      end else if (s_axi_rready && s_axi_rvalid) begin
        s_axi_rvalid <= 1'b0;
      end
    end
  end

endmodule`,
        supportFiles: [],
      }

    case 'pwm_gen':
      return {
        name: 'pwm_gen',
        content: `module pwm_gen #(
  parameter NUM_CHANNELS = 4,
  parameter RESOLUTION   = 12   // bit width of counter
)(
  input  wire                       clk,
  input  wire                       rst_n,
  input  wire [RESOLUTION-1:0]      duty  [0:NUM_CHANNELS-1],
  input  wire [RESOLUTION-1:0]      period,
  input  wire [RESOLUTION-1:0]      dead_time,
  output reg  [NUM_CHANNELS-1:0]    pwm_out,
  output reg  [NUM_CHANNELS-1:0]    pwm_out_n  // complementary with dead-time
);

  reg [RESOLUTION-1:0] counter;
  integer ch;

  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      counter <= 0;
    end else begin
      if (counter >= period)
        counter <= 0;
      else
        counter <= counter + 1;
    end
  end

  // PWM output generation with dead-time
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      pwm_out   <= 0;
      pwm_out_n <= 0;
    end else begin
      for (ch = 0; ch < NUM_CHANNELS; ch = ch + 1) begin
        pwm_out[ch]   <= (counter < duty[ch]) ? 1'b1 : 1'b0;
        // Complementary output with dead-time insertion
        if (counter < duty[ch] - dead_time)
          pwm_out_n[ch] <= 1'b0;
        else if (counter >= duty[ch] + dead_time)
          pwm_out_n[ch] <= 1'b1;
        else
          pwm_out_n[ch] <= 1'b0;  // dead zone — both off
      end
    end
  end

endmodule`,
        supportFiles: [],
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
        supportFiles: [],
      }
  }
}

function getTestbench(moduleName: string, moduleType: string): string {
  const tbPorts: Record<string, string> = {
    uart_tx: `  reg        clk;
  reg        rst_n;
  reg  [7:0] tx_data;
  reg        tx_start;
  wire       tx_out;
  wire       tx_busy;
  wire       tx_done;

  uart_tx #(.BAUD_DIV(4)) dut (
    .clk      (clk),
    .rst_n    (rst_n),
    .tx_data  (tx_data),
    .tx_start (tx_start),
    .tx_out   (tx_out),
    .tx_busy  (tx_busy),
    .tx_done  (tx_done)
  );

  initial clk = 0;
  always #5 clk = ~clk;

  initial begin
    rst_n = 0; tx_start = 0; tx_data = 8'h00;
    #20; rst_n = 1;
    #10;
    tx_data = 8'hA5;
    tx_start = 1;
    #10; tx_start = 0;
    wait(tx_done);
    #20;
    $display("UART TX test completed — sent 0xA5");
    $finish;
  end`,
    spi_master: `  reg        clk;
  reg        rst_n;
  reg  [7:0] mosi_data;
  reg        start;
  wire [7:0] miso_data;
  wire       done;
  wire       busy;
  wire       sclk;
  wire       mosi;
  reg        miso;
  wire       cs_n;

  spi_master #(.CLK_DIV(4), .DATA_WIDTH(8)) dut (
    .clk       (clk),
    .rst_n     (rst_n),
    .mosi_data (mosi_data),
    .start     (start),
    .miso_data (miso_data),
    .done      (done),
    .busy      (busy),
    .sclk      (sclk),
    .mosi      (mosi),
    .miso      (miso),
    .cs_n      (cs_n)
  );

  initial clk = 0;
  always #5 clk = ~clk;
  always @(posedge sclk) miso <= $random;

  initial begin
    rst_n = 0; start = 0; mosi_data = 8'h00; miso = 0;
    #20; rst_n = 1;
    #10;
    mosi_data = 8'hAB;
    start = 1;
    #10; start = 0;
    wait(done);
    #20;
    $display("SPI transfer completed — MISO received: %h", miso_data);
    $finish;
  end`,
    fifo_buffer: `  reg        clk;
  reg        rst_n;
  reg  [7:0] wr_data;
  reg        wr_en;
  wire       full;
  wire [7:0] rd_data;
  reg        rd_en;
  wire       empty;

  fifo_buffer #(.DATA_WIDTH(8), .DEPTH(16)) dut (
    .clk     (clk),
    .rst_n   (rst_n),
    .wr_data (wr_data),
    .wr_en   (wr_en),
    .full    (full),
    .rd_data (rd_data),
    .rd_en   (rd_en),
    .empty   (empty)
  );

  initial clk = 0;
  always #5 clk = ~clk;

  integer i;
  initial begin
    rst_n = 0; wr_en = 0; rd_en = 0; wr_data = 0;
    #20; rst_n = 1;
    // Write 8 values
    for (i = 0; i < 8; i = i + 1) begin
      @(posedge clk); wr_data = i; wr_en = 1;
    end
    @(posedge clk); wr_en = 0;
    // Read them back
    for (i = 0; i < 8; i = i + 1) begin
      @(posedge clk); rd_en = 1;
    end
    @(posedge clk); rd_en = 0;
    #20;
    $display("FIFO test completed");
    $finish;
  end`,
    axi4_lite_slave: `  reg         aclk;
  reg         aresetn;
  reg  [7:0]  awaddr;
  reg         awvalid;
  wire        awready;
  reg  [31:0] wdata;
  reg  [3:0]  wstrb;
  reg         wvalid;
  wire        wready;
  wire [1:0]  bresp;
  wire        bvalid;
  reg         bready;
  reg  [7:0]  araddr;
  reg         arvalid;
  wire        arready;
  wire [31:0] rdata;
  wire [1:0]  rresp;
  wire        rvalid;
  reg         rready;

  axi4_lite_slave #(.ADDR_WIDTH(8), .DATA_WIDTH(32)) dut (
    .aclk(aclk), .aresetn(aresetn),
    .s_axi_awaddr(awaddr), .s_axi_awvalid(awvalid), .s_axi_awready(awready),
    .s_axi_wdata(wdata), .s_axi_wstrb(wstrb), .s_axi_wvalid(wvalid), .s_axi_wready(wready),
    .s_axi_bresp(bresp), .s_axi_bvalid(bvalid), .s_axi_bready(bready),
    .s_axi_araddr(araddr), .s_axi_arvalid(arvalid), .s_axi_arready(arready),
    .s_axi_rdata(rdata), .s_axi_rresp(rresp), .s_axi_rvalid(rvalid), .s_axi_rready(rready)
  );

  initial aclk = 0;
  always #5 aclk = ~aclk;

  initial begin
    aresetn = 0; awvalid = 0; wvalid = 0; bready = 1;
    arvalid = 0; rready = 1; wstrb = 4'hF;
    #20; aresetn = 1;
    // Write 0xDEADBEEF to register 0
    #10; awaddr = 8'h00; awvalid = 1; wdata = 32'hDEADBEEF; wvalid = 1;
    wait(awready && wready); @(posedge aclk); awvalid = 0; wvalid = 0;
    wait(bvalid); @(posedge aclk);
    // Read it back
    #10; araddr = 8'h00; arvalid = 1;
    wait(arready); @(posedge aclk); arvalid = 0;
    wait(rvalid); @(posedge aclk);
    $display("AXI4-Lite read back: %h (expect DEADBEEF)", rdata);
    #20; $finish;
  end`,
    pwm_gen: `  reg        clk;
  reg        rst_n;
  reg [11:0] duty  [0:3];
  reg [11:0] period;
  reg [11:0] dead_time;
  wire [3:0] pwm_out;
  wire [3:0] pwm_out_n;

  pwm_gen #(.NUM_CHANNELS(4), .RESOLUTION(12)) dut (
    .clk       (clk),
    .rst_n     (rst_n),
    .duty      (duty),
    .period    (period),
    .dead_time (dead_time),
    .pwm_out   (pwm_out),
    .pwm_out_n (pwm_out_n)
  );

  initial clk = 0;
  always #5 clk = ~clk;

  initial begin
    rst_n = 0; period = 12'd4095; dead_time = 12'd10;
    duty[0] = 12'd1024; duty[1] = 12'd2048;
    duty[2] = 12'd3072; duty[3] = 12'd512;
    #20; rst_n = 1;
    #200000;
    $display("PWM test completed");
    $finish;
  end`,
  }

  const body = tbPorts[moduleType] ?? `  reg        clk;
  reg        rst_n;
  reg  [7:0] data_in;
  wire [7:0] data_out;

  ${moduleName} dut (
    .clk      (clk),
    .rst_n    (rst_n),
    .data_in  (data_in),
    .data_out (data_out)
  );

  initial clk = 0;
  always #5 clk = ~clk;

  initial begin
    rst_n = 0; data_in = 0;
    #20; rst_n = 1;
    #10; data_in = 8'hAA;
    #100;
    $display("Test completed");
    $finish;
  end`

  return `\`timescale 1ns / 1ps

module ${moduleName}_tb;

${body}

  // Waveform dump
  initial begin
    $dumpfile("${moduleName}_tb.vcd");
    $dumpvars(0, ${moduleName}_tb);
  end

endmodule`
}

function getTimingPeriod(timingId: string | undefined): string {
  switch (timingId) {
    case '50mhz': return '20.000'
    case '100mhz': return '10.000'
    case '200mhz': return '5.000'
    case '10mhz': return '100.000'
    default: return '10.000'
  }
}

function getConstraints(targetTech: string | undefined, timingId: string | undefined): string {
  const period = getTimingPeriod(timingId)
  if (targetTech === 'sky130' || targetTech === 'gf180') {
    return `# SDC Constraints — ASIC (${targetTech?.toUpperCase()})
create_clock -name clk -period ${period} [get_ports clk]
set_clock_uncertainty 0.1 [get_clocks clk]

set_input_delay 1.5 -clock clk [remove_from_collection [all_inputs] clk]
set_output_delay 1.5 -clock clk [all_outputs]

set_max_area 0
set_max_fanout 20 [current_design]
`
  }
  if (targetTech === 'xilinx_7series' || targetTech === 'intel_cyclone_v') {
    return `# Timing Constraints — FPGA
create_clock -period ${period} -name sys_clk [get_ports clk]

# I/O Constraints
set_input_delay -clock sys_clk 2.0 [all_inputs]
set_output_delay -clock sys_clk 2.0 [all_outputs]

# False paths
set_false_path -from [get_ports rst_n]
`
  }
  return `# Constraints — technology-agnostic
create_clock -period ${period} -name sys_clk [get_ports clk]
set_input_delay -clock sys_clk 2.0 [all_inputs]
set_output_delay -clock sys_clk 2.0 [all_outputs]
`
}

function getMemoryMap(moduleType: string, memoryId: string | undefined): string {
  if (memoryId === 'no_storage') {
    return `// No internal storage — purely combinational logic
`
  }
  if (moduleType === 'axi4_lite_slave') {
    return `// Memory Map — AXI4-Lite Register Bank
// Offset  | Register     | Access
// --------+--------------+--------
// 0x00    | CTRL_REG     | R/W
// 0x04    | STATUS_REG   | R
// 0x08    | DATA_REG_0   | R/W
// 0x0C    | DATA_REG_1   | R/W
// 0x10    | IRQ_ENABLE   | R/W
// 0x14    | IRQ_STATUS   | R/W1C
`
  }
  if (moduleType === 'fifo_buffer') {
    return `// Storage: Internal FIFO memory
// Depth: Parameterisable (default 256 entries)
// Width: Parameterisable (default 8 bits)
// Type:  Inferred block RAM or distributed RAM
`
  }
  return `// Memory configuration
// Storage type: ${getSpecLabel('memory', memoryId)}
// Adapt memory map to design requirements.
`
}

function buildReadme(moduleName: string, specs: Record<string, string>): string {
  const lines: string[] = [
    `# ${moduleName} Project`,
    '',
    'Generated by EasyChip Playground.',
    '',
    '## Specifications',
  ]

  const specMapping: { categoryId: string; label: string }[] = [
    { categoryId: 'module_type', label: 'Module Type' },
    { categoryId: 'interface_ports', label: 'Interface' },
    { categoryId: 'clock_reset', label: 'Clock & Reset' },
    { categoryId: 'parameters', label: 'Parameters' },
    { categoryId: 'functional_behaviour', label: 'Functional Behaviour' },
    { categoryId: 'timing', label: 'Timing' },
    { categoryId: 'memory', label: 'Memory' },
    { categoryId: 'edge_cases', label: 'Edge Cases' },
    { categoryId: 'target_tech', label: 'Target Technology' },
  ]

  for (const { categoryId, label } of specMapping) {
    const optionLabel = getSpecLabel(categoryId, specs[categoryId])
    lines.push(`- ${label}: ${optionLabel}`)
  }

  lines.push(
    '',
    '## Structure',
    '- `rtl/` — Synthesizable RTL modules',
    '- `tb/` — Testbenches and verification',
    '- `syn/` — Synthesis scripts and constraints',
    '- `mem/` — Memory configuration',
    '- `docs/` — Documentation',
    ''
  )
  return lines.join('\n')
}

function buildSpecSheet(specs: Record<string, string>): string {
  const specMapping: { categoryId: string; label: string }[] = [
    { categoryId: 'module_type', label: 'Module Type' },
    { categoryId: 'interface_ports', label: 'Interface' },
    { categoryId: 'clock_reset', label: 'Clock & Reset' },
    { categoryId: 'parameters', label: 'Parameters' },
    { categoryId: 'functional_behaviour', label: 'Behaviour' },
    { categoryId: 'timing', label: 'Timing' },
    { categoryId: 'memory', label: 'Memory' },
    { categoryId: 'edge_cases', label: 'Edge Cases' },
    { categoryId: 'target_tech', label: 'Target Tech' },
  ]

  const rows = specMapping.map(({ categoryId, label }) => {
    const val = getSpecLabel(categoryId, specs[categoryId])
    return `| ${label.padEnd(20)} | ${val.padEnd(50)} |`
  })

  return `# Specification Sheet

| Parameter            | Value                                              |
|----------------------|----------------------------------------------------|
${rows.join('\n')}
`
}

export function generateFolderStructure(specs: Record<string, string>): FileNode {
  const moduleType = specs.module_type || ''
  const mod = getModuleVerilog(moduleType)
  const moduleName = mod.name
  const targetTech = specs.target_tech || 'tech_agnostic'
  const timingId = specs.timing

  const rtlChildren: FileNode[] = [
    {
      name: `${moduleName}.v`,
      type: 'file',
      tag: 'RTL',
      content: mod.content,
    },
    ...mod.supportFiles,
  ]

  const root: FileNode = {
    name: 'project_root',
    type: 'folder',
    children: [
      {
        name: 'rtl',
        type: 'folder',
        children: rtlChildren,
      },
      {
        name: 'tb',
        type: 'folder',
        children: [
          {
            name: `${moduleName}_tb.v`,
            type: 'file',
            tag: 'TB',
            content: getTestbench(moduleName, moduleType),
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
            content: getConstraints(targetTech, timingId),
          },
          {
            name: 'synth.tcl',
            type: 'file',
            tag: 'SYN',
            content: `# Synthesis script
# Target: ${getSpecLabel('target_tech', targetTech)}

read_verilog ../rtl/${moduleName}.v

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
            content: getMemoryMap(moduleType, specs.memory),
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
            content: buildReadme(moduleName, specs),
          },
          {
            name: 'spec_sheet.md',
            type: 'file',
            tag: 'DOC',
            content: buildSpecSheet(specs),
          },
        ],
      },
      {
        name: 'Makefile',
        type: 'file',
        tag: 'PKG',
        content: `# EasyChip Project Makefile

TOP = ${moduleName}
RTL = rtl/$(TOP).v
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
