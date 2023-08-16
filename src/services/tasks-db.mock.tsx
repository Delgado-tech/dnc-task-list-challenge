export interface ITask {
    title?: string,
    description?: string,
    completed?: boolean
}

interface ITaskData {
    id: number,
    data: ITask
}

export class TaskFakeDB {
    private readonly database: ITaskData[];
    private currentId: number;

    constructor() {
        this.database = [];
        this.currentId = 0;
    }

    public Insert (tasks: ITask[]): void {
        tasks.map((task) => {
            this.database.push({
                id: this.currentId,
                data: task
            });

            this.currentId++;
        });
    }

    public Update (task: ITaskData): boolean {
        this.database.map((data) => {
            if(data.id === task.id) {
                for (const [key] of Object.entries(data.data)) {
                    if ((task.data as any)[key] !== undefined && (data.data as any)[key] !== (task.data as any)[key]) {
                        (data.data as any)[key] = (task.data as any)[key];
                    }
                }
                return true;
            }
        });
        return false;
    }

    public Delete (id: number): boolean {
        this.database.map((data) => {
            if (data.id === id) {
                const deleteId = this.database.indexOf(data);
                this.database.splice(deleteId, 1);
                return true;
            }
        });
        return false;
    }

    public getCurrentId(): number {
        return this.currentId;
    }

    public getDatabase(): ITaskData[] {
        return this.database;
    }

    public getData(id: number): ITaskData | undefined {
        return this.database.find((data) => data.id === id);
    }

}

export const startTasks: ITask[] = [
    { title: "Exercicios", description: "Ir para academia fazer exercicios", completed: true },
    { title: "Limpar o carro", description: "Limpar o carro inteiro, de dentro pra fora", completed: false },
    { title: "Banho e tosa", description: "Levar o cachorro ao pet shop", completed: false },
    { title: "Limpar quarto", description: "Limpar toda bagunça que está dentro do quarto", completed: true },
    { title: "trabalhar", description: "Chegar ao escritorio antes das 20:00", completed: true },
    { title: "Ir ao banco", description: "Chear ao banco antes das 10:00", completed: false },
    { title: "Almoçar", description: "Preparar a comida para a janta", completed: false },
    { title: "Jogar volei", description: "Ir a quadra para jogar volei com os amigos", completed: true },
    { title: "Estudar programação", description: "Entrar na plataforma dos alunos para estudar", completed: false },
    { title: "shopping", description: "Fazer algumas compras no shopping", completed: true }
]