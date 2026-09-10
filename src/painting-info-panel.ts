import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'painting-info-panel',
  schema: {
    imageTargetName: ecs.string,  // nombre del target: "Idayvuelta" o "Estudio"
    closeButton: ecs.eid,         // referencia a la entidad del botón X
  },
  schemaDefaults: {
    imageTargetName: '',
  },
  add: (world, component) => {
    const {eid, schema} = component
    const {imageTargetName, closeButton} = schema

    // Muestra el panel cuando se detecta la pintura correspondiente
    world.events.addListener(world.events.globalId, 'reality.imagefound', (e: any) => {
      if (e.data.name === imageTargetName) {
        ecs.Hidden.remove(world, eid)
      }
    })

    // No escuchamos 'reality.imagelost' a propósito:
    // así el panel se queda visible aunque se pierda el tracking.

    // Oculta el panel solo al presionar el botón X
    world.events.addListener(closeButton, ecs.input.SCREEN_TOUCH_START, () => {
      ecs.Hidden.set(world, eid, {})
    })
  },
})