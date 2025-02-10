export interface TankData {
    type: string;
    BarScreen: number;
    OilGreaseTank: number;
    EqualizationTank: number;
    AnoxicTank: number;
    MBBRTank: number;
    TubeSettle: number;
    FilterFeedTank: number;
    TreatedWaterTank: number;
    UFWaterTank: number;
    SludgeHoldingTank: number;
    volume: number;
    breath: {
        barScreen: number;
        oilGrease: number;
        equalization: number;
        anoxic: number;
        mbbr: number;
        tubeSettle: number;
        filterFeed: number;
        treatedWater: number;
        uf: number;
        sludge: number;
    };
    length: number;
    height: number;
}