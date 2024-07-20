type FurnitureVariant = 'Art Deco' | 'Victorian' | 'Modern';

abstract class Chair {
    abstract name: string;
    isFilled: boolean = false;
    hasLegs(): number 
    {
        return 4;
    }

    sitOn(): boolean
    {
        if (!this.isFilled)
            {
                this.isFilled = true;
                return true;
            }
            return false;
    }
}

class VictorianChair extends Chair 
{
    override name = 'Victorian Chair';
}

class ArtDecoChair extends Chair 
{
    override name = 'Art Deco Chair';
}
class ModernChair extends Chair 
{
    override name = 'Modern Chair';
}


abstract class Table {
    abstract name: string;
    abstract area: number;

    hasLegs(): number
    {
        return 4;
    }

    addTo(objectArea: number): boolean 
    {
        let spaceLeft: number = this.area - objectArea;
        if (spaceLeft < 0)
        {
            return false;
        }
        
        this.area = spaceLeft;
        return true;
    }
}

class VictorianTable extends Table
{
    override name = 'Victorian Table';
    override area = 100;
}

class ArtDecoTable extends Table
{
    override name = 'Art Deco Table';
    override area = 50;
}

class ModernTable extends Table
{
    override name = 'Modern Table';
    override area = 150;
}


abstract class Sofa {
    abstract name: string;
    abstract sittingSpotCount: number;
    hasLegs(): number
    {
        return 4;
    }

    sitOn(spotsReserved: number): boolean
    {
        let spotsLeft: number = this.sittingSpotCount - spotsReserved;
        if (this.sittingSpotCount < 0)
        {
            return false;
        }

        this.sittingSpotCount = spotsLeft;
        return true;
    }
}

class VictorianSofa extends Sofa
{
    override name = 'Victorian Sofa';
    override sittingSpotCount = 3;
}

class ArtDecoSofa extends Sofa 
{
    override name = 'Art Deco Sofa';
    override sittingSpotCount = 2;
}

class ModernSofa extends Sofa
{
    override name = 'Moden Sofa';
    override sittingSpotCount = 4;
}

interface FurnitureFactory {
    createChair():Chair;
    createTable():Table;
    createSofa():Sofa;
}

class VictorianFurnitureFactory  implements FurnitureFactory
{
    createChair(): Chair
    {
        return new VictorianChair();
    }

    createTable(): Table
    {
        return new VictorianTable();
    }

    createSofa(): Sofa
    {
        return new VictorianSofa();
    }
}

class ArtDecoFurnitureFactory implements FurnitureFactory
{
    createChair(): Chair
    {
        return new ArtDecoChair();
    }

    createTable(): Table
    {
        return new ArtDecoTable();
    }

    createSofa(): Sofa
    {
        return new ArtDecoSofa();
    }
}

class ModernFurnitureFactory
{
    createChair(): Chair
    {
        return new ModernChair();
    }

    createTable(): Table
    {
        return new ModernTable();
    }

    createSofa(): Sofa
    {
        return new ModernSofa();
    }
}

class Client 
{
    factory: FurnitureFactory;

    constructor(type: string)
    {
        this.factory = this.determineType(type);
    }

    buy(productName:string): void
    {
        switch(productName.toLowerCase())
        {
            case 'chair':
            {
                let prod: Chair = this.factory.createChair();
                console.log(`Bought a ${prod.name} with ${prod.hasLegs()} legs.`);
                break;
            }
            
            case 'table':
            {
                let prod: Table = this.factory.createTable();
                console.log(`Bought a ${prod.name} with ${prod.hasLegs()} legs.`);
                break;
            }
            
            case 'sofa':
            {
                let prod: Sofa = this.factory.createSofa();
                console.log(`Bought a ${prod.name} with ${prod.hasLegs()} legs.`);
                break;
            }

            default:
                console.error(`This product [${productName}] does not exist.`);
                break;
        }
    }

    buySet(): void
    {
        this.buy('chair');
        this.buy('table');
        this.buy('sofa');
    }

    determineType(type: string): FurnitureFactory
    {
        switch(type.toLowerCase())
        {
            case 'victorian':
                return new VictorianFurnitureFactory();
            
            case 'art deco':
                return new ArtDecoFurnitureFactory();

            case 'modern':
            default:
                return new ModernFurnitureFactory();
        }
    }
}

const VictorianClient: Client = new Client('Victorian');
const ArtDecoClient: Client = new Client('Art Deco');
const ModernClient: Client = new Client('Modern');

VictorianClient.buy('chair');
ArtDecoClient.buySet();
ModernClient.buy('Cheep');
