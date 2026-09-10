import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'persist-on-lost',
  schema: {
    imageTargetName: ecs.string,
  },
  schemaDefaults: {
    imageTargetName: '',
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(world.events.globalId, 'reality.imagelost', (e) => {
        const {imageTargetName} = schemaAttribute.get(eid)
        const {name} = e.data as any

        if (name === imageTargetName) {
          ecs.Hidden.remove(world, eid)
        }
      })
  },
})