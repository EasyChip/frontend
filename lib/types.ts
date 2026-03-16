export interface GenerateRequest {
  prompt: string
  testbench?: string
}

export interface GenerateResponse {
  prompt: string
  rtl: string
  testbench: string
  test_result: string
  waveform: string
  attempts: number
  status: string
  compile_log: string
  simulation_log: string
}
