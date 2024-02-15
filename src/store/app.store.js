import { create } from 'zustand'

export const usePopUpStore = create((set) => ({
  showErrorPopUp: false,
  setShowErrorPopUp: (value) => set(() => ({ showErrorPopUp: value })),
  selectedErrorPopUp: 'unknown',
  updateSelectedErrorPopUp: (errMsg) =>
    set(() => {
      switch (errMsg) {
        case 'DUPLICATED_TASK':
          return { selectedErrorPopUp: 'duplicated_task', showErrorPopUp: true }
        default:
          return { selectedErrorPopUp: 'unknown', showErrorPopUp: true }
      }
    }),
}))
export const useEditTaskDateModalStore = create((set) => ({
  showEditTaskDateModal: false,
  taskId: '',
  queryKey: [],
  date: null,
  setEditTaskDateModalData: (taskId, queryKey, date) => set(() => ({ taskId: taskId, queryKey: queryKey, date: date })),
  setShowEditTaskDateModal: (value) => set(() => ({ showEditTaskDateModal: value })),
}))
export const useSettingsModalStore = create((set) => ({
  showSettingsModal: false,
  setShowSettingsModal: (value) => set(() => ({ showSettingsModal: value })),
}))
export const useTaskStore = create((set) => ({
  needAnimationTasksId: [],
  addNeedAnimationTaskId: (taskId) =>
    set((state) => ({ needAnimationTasksId: [...state.needAnimationTasksId, taskId] })),
  removeNeedAnimationTaskId: (taskIdToRemove) =>
    set((state) => ({
      needAnimationTasksId: state.needAnimationTasksId.filter((taskId) => taskId !== taskIdToRemove),
    })),
  scrollToTop: false,
  setScrollToTop: (value) => set(() => ({ scrollToTop: value })),
  showOverlay: false,
  overlayExceptionTaskId: null,
  setOverlayExceptionTaskId: (taskId) =>
    set((state) => ({ ...state, overlayExceptionTaskId: taskId, showOverlay: !!taskId })),
}))
export const useTaskStepStore = create((set) => ({
  focusedTaskStepId: '',
  setFocusedTaskStepId: (focusedTaskStepId) => set(() => ({ focusedTaskStepId: focusedTaskStepId })),
}))
