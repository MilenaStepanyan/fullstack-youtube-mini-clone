interface Comment {
    id: number;
    video_id: number;
    user_id: number;
    content: string;
    parent_id?: number;
    created_at: Date;
}
