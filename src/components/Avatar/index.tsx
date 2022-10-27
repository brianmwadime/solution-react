import * as React from 'react'
import './styles.css'

interface Props {
  name?: string
  initials?: string
  colour?: string
  imageSrc?: string
  style?: React.CSSProperties | undefined
  className?: string
  size?: number | undefined
  borderSize?: number | undefined
  borderColour?: string
  borderStyle?: React.CSSProperties | undefined
  borderClassName?: string
  containerStyle?: React.CSSProperties | undefined
  containerClassName?: string
  onClick?: () => void
  children?: any
}

export const Avatar = ({
  imageSrc,
  initials,
  colour,
  name,
  style,
  className,
  size,
  borderSize,
  borderColour,
  borderStyle,
  borderClassName,
  containerStyle,
  containerClassName,
  onClick,
  children
}: Props) => {
  function idealTextColor(bgColor?: string) {
    var nThreshold = 105
    let components = null
    if (bgColor != null) {
      var r = bgColor.substring(1, 3)
      var g = bgColor.substring(3, 5)
      var b = bgColor.substring(5, 7)
      components = {
        R: parseInt(r, 16),
        G: parseInt(g, 16),
        B: parseInt(b, 16)
      }
    } else {
      components = {
        R: 255,
        G: 255,
        B: 255
      }
    }
    var bgDelta =
      components.R * 0.299 + components.G * 0.587 + components.B * 0.114
    return 255 - bgDelta < nThreshold ? '#000' : '#fff'
  }
  function getInitialsFromString(str: string) {
    if (str == null) {
      return ''
    }
    var res = str.split(' ')
    if (res.length > 1) {
      return getInitialsFromWords(res[0], res[1])
    } else if (res.length > 0) {
      return getInitialsFromWords(res[0], '')
    }
    return ''
  }
  function getInitialsFromWords(str1: string, str2: string) {
    var letter1 = ''
    var letter2 = ''
    if (str1 != null && str1 !== '') {
      letter1 = str1[0]
    }
    if (str2 != null && str2 !== '') {
      letter2 = str2[0]
    }
    return letter1 + letter2
  }

  let avatarClasses = 'avatar'
  const styleMod: React.CSSProperties = { ...style }
  if (colour) {
    styleMod.backgroundColor = colour
    styleMod.color = idealTextColor(colour)
  }
  if (size != null) {
    styleMod.height = size + 'px'
    styleMod.width = size + 'px'
    styleMod.fontSize = size / 2 + 'px'
    styleMod.lineHeight = size - 1 + 'px'
    styleMod.backgroundSize = size + 'px'
  }
  if (onClick != null) {
    avatarClasses += ' hoverable'
  }
  if (className != null) {
    avatarClasses += ' ' + className
  }

  let initialsMod = null
  if (imageSrc != null && imageSrc !== '') {
    styleMod.backgroundImage = 'url(' + imageSrc + ')'
  } else {
    if (initials) {
      initialsMod = initials
    } else if (name) {
      initialsMod = getInitialsFromString(name)
    }
  }

  let containerClasses = 'react-profile-avatar'
  if (containerClassName) {
    containerClasses += ' ' + containerClassName
  }

  const avatar = (
    <div
      className={avatarClasses}
      style={styleMod}
      title={name}
      onClick={onClick}
    >
      {initialsMod}
    </div>
  )

  if (borderSize != null && borderSize > 0) {
    const borderStyleMod: React.CSSProperties = { ...borderStyle }
    borderStyleMod.borderWidth = borderSize
    if (borderColour) {
      borderStyleMod.borderColor = borderColour
    }
    if (size != null) {
      borderStyleMod.height = size + borderSize * 2 + 2 + 'px'
      borderStyleMod.width = size + borderSize * 2 + 2 + 'px'
    }

    let borderClasses = 'avatar-border'
    if (borderClassName != null) {
      borderClasses += ' ' + borderClassName
    }

    return (
      <div className={containerClasses} style={containerStyle}>
        <div className={borderClasses} style={borderStyleMod}>
          {avatar}
          {children}
        </div>
      </div>
    )
  } else {
    return (
      <div className={containerClasses} style={containerStyle}>
        {avatar}
        {children}
      </div>
    )
  }
}