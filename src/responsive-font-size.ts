import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'responsive-font-size',
  schema: {
    minSize: ecs.f32,       // tamaño mínimo, en celulares chicos
    maxSize: ecs.f32,       // tamaño máximo, en tablets grandes
    widthPercent: ecs.f32,  // % del ancho de pantalla que define el tamaño "ideal"
  },
  schemaDefaults: {
    minSize: 18,
    maxSize: 40,
    widthPercent: 6,
  },
  add: (world, component) => {
    const {eid, schema} = component
    const {minSize, maxSize, widthPercent} = schema

    const applySize = () => {
      const ideal = window.innerWidth * (widthPercent / 100)
      const clamped = Math.min(maxSize, Math.max(minSize, ideal))
      ecs.Ui.mutate(world, eid, (cursor) => {
        cursor.fontSize = clamped
      })
    }

    applySize()
    window.addEventListener('resize', applySize)
    window.addEventListener('orientationchange', applySize)
  },
})