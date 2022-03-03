// Inspired heavily by:
// https://www.youtube.com/watch?v=BV8lfw-tdRU

interface IStateConfig{
    name?: string
    onEnter?: () => void
    onUpdate?: (dt: number) => void
    onExit?: () => void
}

export default class NewStateMachine
{
    private context?: any
    private name: string
    private states = new Map<string, IStateConfig>()

    private currentState?: IStateConfig
    private isSwitchingState = false
    private stateQueue: string[] = []

    constructor(context?: any, name?: string)
    {
        this.context = context
        this.name = name ?? 'fsm'
    }

    isCurrentState(name: string)
    {
       if (!this.currentState)
       {
           return false
       }

       return this.currentState.name === name
    }

    addState(name: string, config?:IStateConfig)
    {
        this.states.set(name, {
            name,
            onEnter: config?.onEnter?.bind(this.context),
            onUpdate: config?.onUpdate?.bind(this.context),
            onExit: config?.onExit?.bind(this.context)
        })

        return this
    }

    setState(name: string)
    {
        if (!this.states.has(name))
        {
            return
        }

        if (this.isSwitchingState)
        {
            this.stateQueue.push(name)
            return
        }

        this.isSwitchingState = true

        console.log(`[StateMachine (${this.name})] change from ${this.currentState?.name ?? 'none'} to ${name}`)

        if (this.currentState && this.currentState.onExit)
        {
            this.currentState.onExit()
        }

        this.currentState = this.states.get(name)!

        if (this.currentState.onEnter)
        {
            this.currentState.onEnter()
        }

        this.isSwitchingState = false

        return this
    }

    update(dt: number)
    {
        if (this.stateQueue.length > 0)
        {
            this.setState(this.stateQueue.shift()!)
            return
        }

        if (!this.currentState)
        {
            return
        }

        if (this.currentState.onUpdate)
        {
            this.currentState.onUpdate(dt)
        }
    }
}