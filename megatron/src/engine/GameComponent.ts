type GameComponentMap = {
    [key: string]: GameComponent;
}

class GameComponent {
    private gameComponents: GameComponentMap;

    public constructor() {
        this.gameComponents = {};
    }

    public addGameComponent(gameComponentName: string, gameComponent: GameComponent): void {
        if (gameComponentName in this.gameComponents) {
            return;
        }

        this.gameComponents[gameComponentName] = gameComponent;
    }

    public checkProperty(property: string): boolean {
        return property in this.gameComponents;
    }

    public getProperty(property: string): any {
        return this.gameComponents[property];
    }
}

export {GameComponent};