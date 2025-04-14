

export interface AppModeEntry {
    title: string, // 导航条显示的模式名
    defaultPrimaryColor: string, // 模式主题色
    storeName: string, // 数据库名
    component: Component, // 废弃
    componentKey: 'LOG' | 'LOVE' | 'DRUG' | 'TREATMENT'
}