export interface SpecOption {
  id: string
  label: string
}

export interface SpecCategory {
  id: string
  number: string
  title: string
  options: SpecOption[]
}

export const SPEC_CATEGORIES: SpecCategory[] = [
  {
    id: 'architecture',
    number: '01',
    title: 'Architecture Type',
    options: [
      { id: 'risc-v', label: 'RISC-V (RV32I)' },
      { id: 'arm-cortex', label: 'ARM Cortex-M0' },
      { id: 'mips', label: 'MIPS32' },
      { id: 'custom-fsm', label: 'Custom FSM' },
      { id: 'datapath', label: 'Datapath Only' },
    ],
  },
  {
    id: 'pipeline',
    number: '02',
    title: 'Pipeline Stages',
    options: [
      { id: 'single-cycle', label: 'Single Cycle' },
      { id: '3-stage', label: '3-Stage Pipeline' },
      { id: '5-stage', label: '5-Stage Pipeline' },
      { id: '7-stage', label: '7-Stage Pipeline' },
      { id: 'superscalar', label: 'Superscalar (2-issue)' },
    ],
  },
  {
    id: 'memory',
    number: '03',
    title: 'Memory Interface',
    options: [
      { id: 'sram', label: 'SRAM (Sync)' },
      { id: 'dram', label: 'DRAM Controller' },
      { id: 'cache-direct', label: 'Direct-Mapped Cache' },
      { id: 'cache-assoc', label: '2-Way Set Associative' },
      { id: 'rom', label: 'ROM (Read-Only)' },
    ],
  },
  {
    id: 'bus',
    number: '04',
    title: 'Bus Protocol',
    options: [
      { id: 'axi4', label: 'AXI4' },
      { id: 'axi4-lite', label: 'AXI4-Lite' },
      { id: 'ahb', label: 'AHB-Lite' },
      { id: 'wishbone', label: 'Wishbone B4' },
      { id: 'apb', label: 'APB' },
    ],
  },
  {
    id: 'clock',
    number: '05',
    title: 'Clock Domain',
    options: [
      { id: 'single-50', label: 'Single — 50 MHz' },
      { id: 'single-100', label: 'Single — 100 MHz' },
      { id: 'dual', label: 'Dual Domain (CDC)' },
      { id: 'gated', label: 'Clock Gating' },
      { id: 'pll', label: 'PLL-Based Multi' },
    ],
  },
  {
    id: 'io',
    number: '06',
    title: 'I/O Peripherals',
    options: [
      { id: 'uart', label: 'UART' },
      { id: 'spi', label: 'SPI Master/Slave' },
      { id: 'i2c', label: 'I2C Controller' },
      { id: 'gpio', label: 'GPIO (32-bit)' },
      { id: 'pwm', label: 'PWM Timer' },
    ],
  },
  {
    id: 'verification',
    number: '07',
    title: 'Verification',
    options: [
      { id: 'basic-tb', label: 'Basic Testbench' },
      { id: 'uvm', label: 'UVM Testbench' },
      { id: 'formal', label: 'Formal (SVA)' },
      { id: 'cocotb', label: 'cocotb (Python)' },
      { id: 'coverage', label: 'Coverage-Driven' },
    ],
  },
  {
    id: 'synthesis',
    number: '08',
    title: 'Synthesis Target',
    options: [
      { id: 'fpga-xilinx', label: 'FPGA — Xilinx 7' },
      { id: 'fpga-intel', label: 'FPGA — Intel Cyclone' },
      { id: 'asic-sky130', label: 'ASIC — SKY130' },
      { id: 'asic-gf180', label: 'ASIC — GF180MCU' },
      { id: 'sim-only', label: 'Simulation Only' },
    ],
  },
  {
    id: 'optimization',
    number: '09',
    title: 'Optimization Goal',
    options: [
      { id: 'area', label: 'Min Area' },
      { id: 'speed', label: 'Max Frequency' },
      { id: 'power', label: 'Low Power' },
      { id: 'balanced', label: 'Balanced' },
      { id: 'throughput', label: 'Max Throughput' },
    ],
  },
]
