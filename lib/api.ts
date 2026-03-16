import type { GenerateRequest, GenerateResponse } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

const MOCK_RESPONSE: GenerateResponse = {
  prompt: '',
  status: 'success',
  test_result: 'PASS',
  attempts: 1,
  rtl: `// Mock RTL — backend offline
module counter_4bit (
    input  wire clk,
    input  wire rst_n,
    input  wire en,
    output reg  [3:0] count,
    output wire overflow
);
    assign overflow = (count == 4'hF) & en;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            count <= 4'h0;
        else if (en)
            count <= count + 1'b1;
    end
endmodule`,
  testbench: `// Mock testbench
module tb_counter_4bit;
    reg clk, rst_n, en;
    wire [3:0] count;
    wire overflow;

    counter_4bit dut (
        .clk(clk), .rst_n(rst_n), .en(en),
        .count(count), .overflow(overflow)
    );

    initial begin
        clk = 0; rst_n = 0; en = 1;
        #10 rst_n = 1;
        #200;
        $display("PASS: counter completed");
        $finish;
    end

    always #5 clk = ~clk;
endmodule`,
  waveform: '',
  compile_log: '// Backend offline — mock mode',
  simulation_log: 'PASS: Simulation completed (mock)',
}

export async function generateRTL(req: GenerateRequest): Promise<GenerateResponse> {
  try {
    const res = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
      signal: AbortSignal.timeout(60_000),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`API error ${res.status}: ${text}`)
    }

    return res.json()
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      throw new Error('Request timed out after 60 seconds')
    }
    // Backend offline — return mock
    if (err instanceof TypeError && err.message.includes('fetch')) {
      return { ...MOCK_RESPONSE, prompt: req.prompt }
    }
    // Connection refused or network error
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('ECONNREFUSED') || msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed')) {
      return { ...MOCK_RESPONSE, prompt: req.prompt }
    }
    throw err
  }
}
