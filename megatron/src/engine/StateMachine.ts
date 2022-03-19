// Inspired heavily by:
// https://blog.ourcade.co/posts/2021/character-logic-state-machine-typescript/
// https://www.youtube.com/watch?v=BV8lfw-tdRU

type StateConfig = {
    name?: string
    onEnter?: () => void
    onUpdate?: (dt: number) => void
    onExit?: () => void
}

class StateMachine
{
    private context?: any
    private name: string
    private states = new Map<string, StateConfig>()

    private currentState?: StateConfig
    private isSwitchingState = false
    private stateQueue: string[] = []

    constructor(context?: any, name?: string)
    {
        this.context = context
        this.name = name ?? 'fsm'
    }

    public isCurrentState(name: string)
    {
       if (!this.currentState)
       {
           return false
       }
       return this.currentState.name === name
    }

    public addState(name: string, config?:StateConfig)
    {
        this.states.set(name, {
            name,
            onEnter: config?.onEnter?.bind(this.context),
            onUpdate: config?.onUpdate?.bind(this.context),
            onExit: config?.onExit?.bind(this.context)
        })

        return this
    }

    public setState(name: string)
    {
        if (!this.states.has(name))
        {
            console.warn(`Tried to change to unknown state: ${name}`)
            return
        }

        if(this.isCurrentState(name)) {
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

       // return this
    }

    public update(dt: number)
    {
        if (this.stateQueue.length > 0)
        {
            this.setState(this.stateQueue.shift()!)
            return
        }

        if (this.currentState && this.currentState.onUpdate)
        {
            this.currentState.onUpdate(dt)
        }

       // if (!this.currentState)
       // {
       //     return
       // }

       // if (this.currentState.onUpdate)
       // {
       //     this.currentState.onUpdate(dt)
       // }
    }
}

export { StateMachine };
export type { StateConfig };