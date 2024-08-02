import {
    EntitySubscriberInterface,
    EventSubscriber,
    TransactionCommitEvent,
    TransactionRollbackEvent,
    TransactionStartEvent,
    UpdateEvent
} from 'typeorm';
import { Member } from './member.entity';

@EventSubscriber()
export class MemberSubscribe implements EntitySubscriberInterface<Member> {
    // 1회만 실행되도록 플래그 값 설정
    private updateOccurred = false;

    // 트랜잭션 시작 전
    async beforeTransactionStart(event: TransactionStartEvent): Promise<void> {
        this.updateOccurred = false;
    }

    // 업데이트 쿼리 실행 후
    async afterUpdate(event: UpdateEvent<Member>): Promise<void> {
        if (event.entity instanceof Member) {
            this.updateOccurred = true;
        }
    }

    // 트랜잭션 커밋 전
    async beforeTransactionCommit(
        event: TransactionCommitEvent
    ): Promise<void> {
        if (this.updateOccurred) {
            // TODO : 엔티티가 업데이트된 경우에만 실행할 로직
            try {
                // await event.manager.find(Member, {
                //     where: { memberCd: 값 }
                // });
            } catch (error) {
                console.log(error);
            }
        }
    }

    // 트랜잭션 커밋 후
    async afterTransactionCommit(event: TransactionCommitEvent): Promise<void> {
        this.updateOccurred = false;
    }

    // 트랜잭션 롤백 전
    async beforeTransactionRollback(
        event: TransactionRollbackEvent
    ): Promise<void> {
        this.updateOccurred = false;
    }
}
