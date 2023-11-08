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
export const useMenuStore = create((set) => ({
  selectedMenuItem: 'inbox',
  updateSelectedMenuItem: (newMenuItem) => set(() => ({ selectedMenuItem: newMenuItem })),
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
}))
