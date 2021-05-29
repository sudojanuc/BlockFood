pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

contract ReservationManager
{
    struct Provider
    {
        uint id;
        string name;
        bool isCreated;
    }

    struct ReservationUnit
    {
        uint id;
        uint16 possibleGuestCount;
        bool isCreated;
    }

    Provider[] private providers;
    ReservationUnit[] private reservationUnits;

    //owner mappings
    mapping (uint => address) private ownerOfProvider;
    mapping (address => Provider) private providerOfOwner;

    //reservationUnit mappings
    mapping (uint => uint) private reservationUnitOfProvider;
    mapping (uint => uint) private reservationUnitCountOfProvider;

    mapping (uint => Provider) private providerOfId;

    //constructor() public { }

    function createProvider(string memory name) public
    {
        require(!providerOfOwner[msg.sender].isCreated);

        uint id = providers.length;
        Provider memory provider = Provider(id, name, true);
        providers.push(provider);

        ownerOfProvider[id] = msg.sender;
        providerOfOwner[msg.sender] = provider;
        providerOfId[id] = provider;
    }

    function createReservationUnit(uint16 guestCount) public
    {
        require(providerOfOwner[msg.sender].isCreated);

        uint id = reservationUnits.length;

        reservationUnits.push(ReservationUnit(id, guestCount, true));
        reservationUnitOfProvider[id] = providerOfOwner[msg.sender].id;
        reservationUnitCountOfProvider[providerOfOwner[msg.sender].id]++;
    }

    function getProviders() public view returns(Provider[] memory)
    {
        return providers;
    }

    function getReservationUnits() public view returns(ReservationUnit[] memory)
    {
        return reservationUnits;
    }

    function getReservationUnitsOfProvider(uint id) public view returns(ReservationUnit[] memory)
    {
        require(providerOfId[id].isCreated);
        ReservationUnit[] memory ru = new ReservationUnit[](reservationUnitCountOfProvider[id]);

        for(uint i = 0;i< reservationUnitCountOfProvider[id]; i++)
        {
            if(reservationUnitOfProvider[i] == id)
                ru[i] = reservationUnits[i];
        }
        return ru;
    }
}
