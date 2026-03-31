import { create } from 'zustand'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  tag?: string
  content?: string
  children?: FileNode[]
}

interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  position: string
  tokens_remaining: number
  tokens_used: number
}

interface Project {
  id: string
  project_name: string
  specs: Record<string, string>
  folder_structure: FileNode | null
  created_at: string
  updated_at: string
}

interface PlaygroundState {
  // User
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
  
  // Specs
  specs: Record<string, string>  // specId → optionId
  setSpec: (specId: string, optionId: string) => void
  clearSpecs: () => void
  
  // Project
  projectName: string
  setProjectName: (name: string) => void
  folderTree: FileNode | null
  setFolderTree: (tree: FileNode | null) => void
  selectedFile: string | null  // file path
  setSelectedFile: (path: string | null) => void
  
  // Projects list
  projects: Project[]
  setProjects: (projects: Project[]) => void
  currentProjectId: string | null
  setCurrentProjectId: (id: string | null) => void
  
  // UI state
  specsPanelOpen: boolean
  toggleSpecsPanel: () => void
  comingSoonModalOpen: boolean
  setComingSoonModalOpen: (open: boolean) => void
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  
  specs: {},
  setSpec: (specId, optionId) => set((state) => ({ 
    specs: { ...state.specs, [specId]: optionId } 
  })),
  clearSpecs: () => set({ specs: {}, folderTree: null, selectedFile: null }),
  
  projectName: 'untitled-project',
  setProjectName: (projectName) => set({ projectName }),
  folderTree: null,
  setFolderTree: (folderTree) => set({ folderTree }),
  selectedFile: null,
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  
  projects: [],
  setProjects: (projects) => set({ projects }),
  currentProjectId: null,
  setCurrentProjectId: (currentProjectId) => set({ currentProjectId }),
  
  specsPanelOpen: true,
  toggleSpecsPanel: () => set((state) => ({ specsPanelOpen: !state.specsPanelOpen })),
  comingSoonModalOpen: false,
  setComingSoonModalOpen: (comingSoonModalOpen) => set({ comingSoonModalOpen }),
}))
