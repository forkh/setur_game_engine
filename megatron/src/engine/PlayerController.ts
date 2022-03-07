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
           // onUpdate: this.idleOnUpdate
        })
        .addState('fly', {
            onEnter: this.flyOnEnter,
          //  onUpdate: this.flyOnUpdate
        })
        .setState('idle')
    }

    update(dt: number)
    {
        this.stateMachine.update(dt)
    }


    private flyOnEnter()
    {
       console.log("fly on enter")
    }

    private flyOnUpdate(){
        this.stateMachine.setState('idle')
    }


    private idleOnEnter()
    {
        console.log("idle on enter")
    }

    private idleOnUpdate()
    {
        this.stateMachine.setState('fly')
    }

    public setState(s: string)
    {
       // console.log("SET STATE TO")
        this.stateMachine.setState(s)
    }
}