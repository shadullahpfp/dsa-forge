'use client'

import { useSyncExternalStore } from 'react'
import Editor from '@monaco-editor/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from 'next-themes'
import { Loader2 } from 'lucide-react'

interface CodeEditorProps {
  code: string
  language: string
  onCodeChange: (code: string) => void
  onLanguageChange: (language: string) => void
  starterCode?: Record<string, string>
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
]

const languageMap: Record<string, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  go: 'go',
  rust: 'rust',
}

// Empty store for hydration
const emptyStore = { subscribe: () => () => {} }

export function CodeEditor({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  starterCode,
}: CodeEditorProps) {
  const { theme } = useTheme()
  // Use useSyncExternalStore for proper hydration
  const mounted = useSyncExternalStore(
    emptyStore.subscribe,
    () => true,
    () => false
  )

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage)
  }

  const handleReset = () => {
    if (starterCode && starterCode[language]) {
      onCodeChange(starterCode[language])
    }
  }

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/50">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          onClick={handleReset}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset code
        </button>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={languageMap[language] || 'javascript'}
          value={code}
          onChange={(value) => onCodeChange(value || '')}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  )
}
