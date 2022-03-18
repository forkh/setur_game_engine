# Readme

## Instructions

### Adding Game Objects

const _nameOfGameObject_: GameObject = new GameObject(zindex: _integer_);

### Adding Controller Component

const _nameOfControllerComponent_: ControllerComponent = new ControllerComponent(_nameOfGameObject_, cm;

### Linking Game Object and Game Component

_nameOfGameObject_.addComponent(_nameOfControllerComponent_);

### Adding Sprites to Game Objects

_nameOfGameObject_.addSprite("_keyForSprite_");

### Adding Box-Colliders

_nameOfGameObject_.addBoxCollider(width: , height: );

### Adding Rigid Body Component

_nameOfGameObject.addRigidBodyComponent(_nameOfGameObject_);

### Adding game Ojects to engine

engine.addGameObject(_nameOfGameObject_);

## Audio

### Adding sounds

Place the sounds you wish to use in the /megatron/public/assets/audio folder.

### Initializing Sounds

Add the key and filename in the /megatron/src/soundMappings.json. To add the specific sound-channel to your game, you need to do the following in the game-code: engine.addTrack("_key_", "_channel-number in integer format_");

### Mapping Sounds to events

To play a sound, you will need to add the following to a game-function or event: document.dispatchEvent(new Event("_key_"));

### Audio Events Mapping

To add another audio mapping, you'll need to add it in the megatron/src/Area51.tsx file under the audioEvents constant. Fx.: { 'key': integer }

## Collision Detection
In order to register an object as a collidable, you need to use the following:

engine.registerCollisionObject(_nameOfGameObject_);

And then you'll have to start the collision detection functionality:

engine.startCollisionChecking();


## KeyMapping and Input Handling

In order to get keypresses from input, you'll need to map the keys in the game logic.
Below is an example from a game we have made:

const inputMappings: InputTriggerMap = {
	'KeyW': () => {document.dispatchEvent(new Event("move_up1"))}
}

The keys for keyboard buttons can be found in the official TypeScript or JavaScript documentation.

### Adding Inputs for the engine to listen for

In the megatron/src/inputMappings.json file, you'll add the specific keys in the following json manner:

{ "_keyName_": "_someKey_", "_keyName2_": "_anotherKey_" } You may add as many keys as you wish. See the official React Documentation to see how to refer to keyboard-keys.

## Sprites and Backgrounds

### Initializing images

Place the images you wish to use in the /megatron/public/assets/images folder.

You'll have to refer to the pictures that you use in the megatron/src/assets.json file, and choose an appropriate key.
 
### Adding sprites to game objects
nameOfGameObject.addSprite("_nameOfGameObject_");

## Positioning
_nameOfGameObject_.getTransform().setPosition(x: , y: );




