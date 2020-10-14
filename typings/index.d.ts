declare module '*.svg' {
    const content: any
    export default content
}

declare module '*.scss' {
    const content: { [className: string]: any }
    export default content
}
