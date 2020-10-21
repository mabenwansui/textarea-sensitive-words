// 解决ts引入以下资源时找不到modules的问题
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module '*._less'
declare namespace React {
  interface StyleHTMLAttributes {
    jsx?: boolean
  }
}