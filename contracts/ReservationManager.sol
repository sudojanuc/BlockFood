pragma solidity >=0.5.16;

//import "../node_modules/@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract ReservationManager
{

    //AggregatorV3Interface internal priceFeed;

    struct Provider
    {
        uint id;
        string name;
        bool isCreated;
    }

    struct ReservationUnit
    {
        uint16 possibleGuestCount;
        bool isCreated;
    }

    Provider[] public providers;
    ReservationUnit[] public reservationUnits;

    //owner mappings
    mapping (uint => address) public ownerOfProvider;
    mapping (address => Provider) public providerOfOwner;

    //reservationUnit mappings
    mapping (uint => ReservationUnit) public reservationUnitOfProvider;
    mapping (uint => uint) public reservationUnitCountOfProvider;


    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public
    {
        //priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    function createProvider(string memory name) public
    {
        uint id = providers.length;
        Provider memory provider = Provider(id, name, true);
        providers.push(provider);

        ownerOfProvider[id] = msg.sender;
        providerOfOwner[msg.sender] = provider;
    }

    function createReservationUnit(uint16 guestCount) public
    {
        require(providerOfOwner[msg.sender].isCreated);

        reservationUnits.push(ReservationUnit(guestCount, true));
        uint id = reservationUnits.length - 1;
        reservationUnitOfProvider[providerOfOwner[msg.sender].id] = reservationUnits[id];
        reservationUnitCountOfProvider[providerOfOwner[msg.sender].id]++;
    }




    /**
     * Returns the latest price
     */
    /*function getThePrice() public view returns (int)
    {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }*/
}
