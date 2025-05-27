export interface MessageDto {
    id?: string;
    fromId: string;
    text: string;
    sentAt?: string;
    timestamp: string;
    avatarUrl?: string;
}
