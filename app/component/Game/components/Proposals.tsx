import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import networkService from '@/service/network';

const Container = styled.div`
    border-bottom: 1px solid red;
    padding: 20px 0px;
    flex: 1;
`;

const Proposal = styled.div`
    display: flex;
    padding: 20px 10px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: larger;
    margin-bottom: 10px;
`;

const Padding = styled.div`
    flex: 1;
`;

const Vote = styled.div`
    padding: 0px 20px;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

@observer
export default class Proposals extends React.Component {
    public render() {
        const { contract } = networkService;
        return (
            <Container>

                {contract.proposed.length && (
                    <div>{contract.proposed.length} Proposals</div>
                )}
                {contract.proposed.map((it) => {
                    const id = contract.getProposalId(it.turn, it.proposer);
                    const status = contract.proposalStatus[id];
                    return (
                        <Proposal key={id}>
                            {it.turn}
                            {status && (
                                <div>Received: {status.vote} Shares</div>
                            )}
                            <Padding />
                            <Vote
                                onClick={() => {
                                    const value = prompt('How many shares do you want to vote?');
                                    if (value) {
                                        contract.vote(it.round, it.turn, it.proposer, value);
                                    }
                                }}
                            >
                                Vote
                            </Vote>
                        </Proposal>
                    );
                })}
            </Container>
        );
    }
}