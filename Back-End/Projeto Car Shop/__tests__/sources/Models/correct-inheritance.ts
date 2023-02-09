import ICar from '../../../src/Interfaces/ICar';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import IVehicle from '../../../src/Interfaces/IVehicle';
import AbstractODM from '../../../src/Models/AbstractODM';

class subOdmTestVehicle extends AbstractODM<IVehicle> { }
class subOdmTestCar extends AbstractODM<ICar> { }
class subOdmTestMotorcycle extends AbstractODM<IMotorcycle> { }
