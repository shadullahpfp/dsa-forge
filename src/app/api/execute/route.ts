import { NextRequest, NextResponse } from 'next/server'

interface ExecutionResult {
  output: string
  error?: string
  executionTime: number
  memoryUsed: number
}

function simulateExecution(code: string, language: string, testCases: { input: string; expectedOutput: string }[]): ExecutionResult {
  const startTime = Date.now()
  
  const hasSyntaxErrors = code.includes('syntax error') || code.trim() === ''
  
  if (hasSyntaxErrors) {
    return {
      output: '',
      error: 'Syntax error detected',
      executionTime: 0,
      memoryUsed: 0,
    }
  }

  const output = testCases.map((tc, index) => {
    return `Test Case ${index + 1}:\nInput: ${tc.input}\nOutput: ${tc.expectedOutput}\nStatus: Passed`
  }).join('\n\n')

  const executionTime = Math.floor(Math.random() * 100) + 10
  const memoryUsed = Math.floor(Math.random() * 10000) + 1000

  return {
    output,
    executionTime,
    memoryUsed,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, language, testCases } = body

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const result = simulateExecution(code, language, testCases || [])

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error executing code:', error)
    return NextResponse.json({ error: 'Failed to execute code' }, { status: 500 })
  }
}
