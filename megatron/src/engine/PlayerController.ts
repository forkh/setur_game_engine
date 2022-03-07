// Inspired by:
// https://github.com/ourcade/sidescrolling-platformer-template-phaser3
import StateMachine from './newStateMachine'

export default class PlayerController
{
    private stateMachine: StateMachine

    constructor()
    {
        this.stateMachine = new StateMachine(this, 'player')

        this.stateMachine.addState('idle', {
            onEnter: this.idleOnEnter,
            onUpdate: this.idleOnUpdate
        })
        .addState('walk', {
            onEnter: this.walkOnEnter,
            onUpdate: this.walkOnUpdate,
            onExit: this.walkOnExit
        })
        .addState('jump', {
            onEnter: this.jumpOnEnter,
            onUpdate: this.jumpOnUpdate
        })
        .setState('idle')
    }

    update(dt: number)
    {
        this.stateMachine.update(dt)
    }

    private idleOnEnter()
    {
        console.log("this is idle")
    }

    private idleOnUpdate()
    {
        this.stateMachine.setState('walk')
    }

    private walkOnEnter()
    {
        console.log("walk on Enter")
    }

    private walkOnUpdate()
    {
        console.log("walk on update")
        this.stateMachine.setState('idle')
    }

    private walkOnExit()
    {
        console.log("stop walking")
    }

    private jumpOnEnter()
    {
        console.log("jump on enter")
    }

    private jumpOnUpdate()
    {
        console.log("jump on update")
    }
}