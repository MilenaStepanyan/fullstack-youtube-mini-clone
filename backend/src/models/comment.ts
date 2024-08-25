interface Comment {
    id: number;
    video_id: number;
    user_id: number;
    comment_text: string;
    parent_id?: number;
    created_at: Date;
}
