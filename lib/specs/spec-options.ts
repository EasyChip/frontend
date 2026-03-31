export interface SpecOption {
  id: string;
  label: string;
  description: string;
}

export interface SpecCategory {
  id: string;
  number: string;
  title: string;
  options: SpecOption[];
}

export const SPEC_CATEGORIES: SpecCategory[] = [
  {
    id: "module_type",
    number: "01",
    title: "Module Type & Function",
    options: [
      {
        id: "uart_tx",
        label: "UART Transmitter",
        description: "8N1 serial transmitter with configurable baud rate",
      },
      {
        id: "spi_master",
        label: "SPI Master",
        description:
          "Full-duplex SPI master with configurable clock polarity and phase",
      },
      {
        id: "fifo_buffer",
        label: "FIFO Buffer",
        description: "Synchronous FIFO with parameterisable depth and width",
      },
      {
        id: "axi4_lite_slave",
        label: "AXI4-Lite Slave",
        description: "Memory-mapped register bank with AXI4-Lite interface",
      },
      {
        id: "pwm_gen",
        label: "PWM Generator",
        description:
          "Multi-channel PWM with dead-time insertion and configurable resolution",
      },
    ],
  },
  {
    id: "interface_ports",
    number: "02",
    title: "Interface Definition — Ports",
    options: [
      {
        id: "minimal",
        label: "Minimal",
        description: "clk, rst_n, data_in, data_out, valid, ready",
      },
      {
        id: "standard",
        label: "Standard",
        description:
          "clk, rst_n, 8-bit data bus, control signals, status flags",
      },
      {
        id: "bus_interface",
        label: "Bus Interface",
        description:
          "Full AXI4-Lite port set (AWADDR, WDATA, BRESP, ARADDR, RDATA...)",
      },
      {
        id: "streaming",
        label: "Streaming",
        description:
          "clk, rst_n, TDATA, TVALID, TREADY, TLAST (AXI-Stream subset)",
      },
      {
        id: "memory_mapped",
        label: "Memory-Mapped",
        description: "clk, rst_n, addr, wdata, rdata, we, re, cs",
      },
    ],
  },
  {
    id: "clock_reset",
    number: "03",
    title: "Clock & Reset",
    options: [
      {
        id: "sync_active_low",
        label: "Single clock, synchronous active-low reset",
        description: "rst_n",
      },
      {
        id: "sync_active_high",
        label: "Single clock, synchronous active-high reset",
        description: "rst",
      },
      {
        id: "async_active_low",
        label: "Single clock, asynchronous active-low reset",
        description: "rst_n",
      },
      {
        id: "dual_clock",
        label: "Dual clock domain with async FIFO crossing",
        description: "Two independent clock domains bridged by async FIFO",
      },
      {
        id: "no_reset",
        label: "Single clock, no reset",
        description: "Purely combinational",
      },
    ],
  },
  {
    id: "parameters",
    number: "04",
    title: "Parameters & Configurability",
    options: [
      {
        id: "std_8bit",
        label: "DATA_WIDTH=8, ADDR_WIDTH=16",
        description: "Standard 8-bit datapath",
      },
      {
        id: "std_32bit",
        label: "DATA_WIDTH=32, ADDR_WIDTH=32",
        description: "32-bit datapath",
      },
      {
        id: "buffered",
        label: "DATA_WIDTH=8, DEPTH=256",
        description: "Buffered with configurable depth",
      },
      {
        id: "serial",
        label: "BAUD_DIV=868, DATA_WIDTH=8",
        description: "Serial protocol with baud divisor",
      },
      {
        id: "multi_channel",
        label: "NUM_CHANNELS=4, RESOLUTION=12",
        description: "Multi-channel with bit resolution",
      },
    ],
  },
  {
    id: "functional_behaviour",
    number: "05",
    title: "Functional Behaviour",
    options: [
      {
        id: "fsm_linear",
        label: "FSM — Linear state machine",
        description: "IDLE → ACTIVE → DONE → IDLE",
      },
      {
        id: "fsm_multi_branch",
        label: "FSM — Multi-branch",
        description:
          "IDLE → SETUP → one of {READ, WRITE, ERROR} → IDLE",
      },
      {
        id: "shift_register",
        label: "Datapath — Shift register",
        description: "Parallel load and serial output",
      },
      {
        id: "pipeline",
        label: "Datapath — Pipeline stages",
        description: "Valid/ready handshake between stages",
      },
      {
        id: "counter",
        label: "Counter-based",
        description:
          "Free-running counter with configurable wrap and compare match",
      },
    ],
  },
  {
    id: "timing",
    number: "06",
    title: "Timing Constraints",
    options: [
      {
        id: "50mhz",
        label: "50 MHz",
        description: "All outputs registered, no multi-cycle paths",
      },
      {
        id: "100mhz",
        label: "100 MHz",
        description: "Registered outputs, single pipeline stage",
      },
      {
        id: "200mhz",
        label: "200 MHz",
        description: "Two-stage pipeline, retiming required",
      },
      {
        id: "10mhz",
        label: "10 MHz",
        description: "Relaxed timing, no pipeline registers needed",
      },
      {
        id: "freq_agnostic",
        label: "Frequency-agnostic",
        description: "Parameterised clock, fully synchronous design",
      },
    ],
  },
  {
    id: "memory",
    number: "07",
    title: "Memory & Storage Elements",
    options: [
      {
        id: "no_storage",
        label: "No internal storage",
        description: "Pure combinational logic",
      },
      {
        id: "register_file",
        label: "Register file",
        description: "Small register bank (4–16 entries)",
      },
      {
        id: "shift_reg",
        label: "Shift register",
        description: "Serial-to-parallel or parallel-to-serial",
      },
      {
        id: "single_port_sram",
        label: "Single-port SRAM",
        description: "Inferred block RAM (configurable depth × width)",
      },
      {
        id: "dual_port_sram",
        label: "Dual-port SRAM",
        description:
          "True dual-port with independent read/write clocks",
      },
    ],
  },
  {
    id: "edge_cases",
    number: "08",
    title: "Edge Cases & Corner Behaviour",
    options: [
      {
        id: "ignore_busy",
        label: "Ignore new requests while busy",
        description: "Latch input at start, drop subsequent",
      },
      {
        id: "queue_requests",
        label: "Queue new requests",
        description: "Accept into internal FIFO, process sequentially",
      },
      {
        id: "abort_reset",
        label: "Abort on reset",
        description: "Immediately return to IDLE, outputs go to safe state",
      },
      {
        id: "overflow_wrap",
        label: "Overflow wrap",
        description: "Counter/pointer wraps to zero silently",
      },
      {
        id: "overflow_saturate",
        label: "Overflow saturate",
        description: "Clamp at maximum value, set overflow flag",
      },
    ],
  },
  {
    id: "target_tech",
    number: "09",
    title: "Target Technology",
    options: [
      {
        id: "sky130",
        label: "ASIC — SKY130",
        description: "130nm open PDK, Yosys + OpenROAD",
      },
      {
        id: "gf180",
        label: "ASIC — GF180MCU",
        description: "180nm open PDK, Yosys + OpenROAD",
      },
      {
        id: "xilinx_7series",
        label: "FPGA — Xilinx 7-Series",
        description: "Vivado synthesis",
      },
      {
        id: "intel_cyclone_v",
        label: "FPGA — Intel/Altera Cyclone V",
        description: "Quartus synthesis",
      },
      {
        id: "tech_agnostic",
        label: "Technology-agnostic",
        description: "Generic synthesis, no PDK-specific optimisation",
      },
    ],
  },
];

/** Look up a category by its id */
export function getCategoryById(id: string): SpecCategory | undefined {
  return SPEC_CATEGORIES.find((c) => c.id === id);
}

/** Look up an option within a category */
export function getOptionById(
  categoryId: string,
  optionId: string,
): SpecOption | undefined {
  const cat = getCategoryById(categoryId);
  return cat?.options.find((o) => o.id === optionId);
}
