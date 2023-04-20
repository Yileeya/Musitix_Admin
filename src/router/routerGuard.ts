export function beforeEach(to: { matched: any[] }, from: any, next: any) {
  // 判斷是否為需要驗證權限的路由
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判斷是否已經登入
    const isLoggedIn = false
    if (!isLoggedIn) {
      // 如果未登入，轉到登入頁面
      next({ name: 'home' })
    } else {
      // 如果已經登入，繼續前往目標路由
      next()
    }
  } else {
    // 如果不需要驗證權限，直接前往目標路由
    next()
  }
}
