const spinner = {
    '@global': {
    '.lds-roller': {
      margin: "4rem 0",
      display: 'inline-block',
      position: 'relative',
      width: 80,
      height: 80
    },
    '.lds-roller div': {
      animation: 'lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      transformOrigin: '40px 40px'
    },
    '.lds-roller div:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: '#000',
      margin: '-4px 0 0 -4px'
    },
    '.lds-roller div:nth-child(1)': {
      animationDelay: '-0.036s'
    },
    '.lds-roller div:nth-child(1):after': {
      top: 63,
      left: 63
    },
    '.lds-roller div:nth-child(2)': {
      animationDelay: '-0.072s'
    },
    '.lds-roller div:nth-child(2):after': {
      top: 68,
      left: 56
    },
    '.lds-roller div:nth-child(3)': {
      animationDelay: '-0.108s'
    },
    '.lds-roller div:nth-child(3):after': {
      top: 71,
      left: 48
    },
    '.lds-roller div:nth-child(4)': {
      animationDelay: '-0.144s'
    },
    '.lds-roller div:nth-child(4):after': {
      top: 72,
      left: 40
    },
    '.lds-roller div:nth-child(5)': {
      animationDelay: '-0.18s'
    },
    '.lds-roller div:nth-child(5):after': {
      top: 71,
      left: 32
    },
    '.lds-roller div:nth-child(6)': {
      animationDelay: '-0.216s'
    },
    '.lds-roller div:nth-child(6):after': {
      top: 68,
      left: 24
    },
    '.lds-roller div:nth-child(7)': {
      animationDelay: '-0.252s'
    },
    '.lds-roller div:nth-child(7):after': {
      top: 63,
      left: 17
    },
    '.lds-roller div:nth-child(8)': {
      animationDelay: '-0.288s'
    },
    '.lds-roller div:nth-child(8):after': {
      top: 56,
      left: 12
    },
    '@keyframes lds-roller': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
}
}

export default spinner;