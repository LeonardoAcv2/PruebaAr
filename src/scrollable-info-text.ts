import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'scrollable-info-text',
  schema: {
    imageTargetName: ecs.string,
    closeButton: ecs.eid,
    text: ecs.string,
  },
  schemaDefaults: {
    imageTargetName: '',
    text: '',
  },
  add: (world, component) => {
    const {schema} = component
    const {imageTargetName, closeButton, text} = schema

    const box = document.createElement('div')
    box.style.position = 'absolute'
    box.style.top = '55%'
    box.style.left = '10%'
    box.style.width = '80%'
    box.style.height = '30%'
    box.style.overflowY = 'auto'
    box.style.color = '#ffffff'
    box.style.fontSize = 'clamp(16px, 4vw, 22px)'  // responsivo, con CSS nativo
    box.style.lineHeight = '1.4'
    box.style.textAlign = 'center'
    box.style.padding = '10px'
    box.style.display = 'none'
    box.style.zIndex = '10'
    box.innerText = text
    document.body.appendChild(box)

    world.events.addListener(world.events.globalId, 'reality.imagefound', (e: any) => {
      if (e.data.name === imageTargetName) {
        box.style.display = 'block'
      }
    })

    world.events.addListener(closeButton, ecs.input.SCREEN_TOUCH_START, () => {
      box.style.display = 'none'
    })
  },
})