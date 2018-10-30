import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import networkService from '@/service/network';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
const Chess = styled.div`
    height: 40px;
    width: 40px;
    background-color: ${(p) => p.color};
    border: 1px solid white;
    border-radius: 5px;
    margin-right: 20px;
`;
const ResultRow = styled.div`
    display: flex;
    align-items: center;
    font-size: xx-large;
    padding: 20px 0px;
`;
const Padding = styled.div`
    flex: 1;
`;
const WinnerArea = styled.div`
    padding: 15px 0px;
    margin-bottom: 20px;
    text-align: center;
    font-size: xx-large;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

`;
const VariableText = styled.span`
    color: white;
    margin: 20px;
`;
const ClearSection = styled.div`
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 20px;
`;
@observer
export default class ControlHeader extends React.Component {
    public render() {
        const { contract } = networkService;
        const { blackCount, whiteCount } = contract.getBoardCount;
        return (
            <Container>
                <WinnerArea>
                    <VariableText>
                        {contract.getTeamName(this.winnerName())}
                    </VariableText>
                    Wins!
                </WinnerArea>
                <ResultRow>
                    <Chess color={'black'} />
                    {contract.getTeamName(contract.black)}
                    <Padding />
                    {blackCount}
                </ResultRow>
                <ResultRow>
                    <Chess color={'white'} />
                    {contract.getTeamName(contract.white)}
                    <Padding />
                    {whiteCount}
                </ResultRow>
                <ClearSection>
                    <button
                        onClick={() => contract.clearGame()}
                    >
                        Clear Game
                    </button>
                </ClearSection>
                {/* <button
                    onClick={() => contract.updateGame()}
                >
                    updateGame
                </button> */}

                {/* <button
                    onClick={() => contract.startNewGame()}
                >
                    Start new Game
                </button> */}
            </Container>
        );
    }

    private winnerName() {
        const { contract } = networkService;
        const { blackCount, whiteCount } = contract.getBoardCount;
        return ( blackCount > whiteCount) ? contract.black : contract.white;
    }
}
