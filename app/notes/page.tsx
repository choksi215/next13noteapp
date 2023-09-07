import Link from "next/link";
import styles from './Notes.module.css';
import CreatNote from "./[id]/CreateNote";
// import PocketBase from 'pocketbase';

async function getNotes() {
    // db option with pocketbase
    // const db = new PocketBase('http://127.0.0.1:8090');
    // const data = await db.records.getList('notes');

    // fetch option to get data
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/Notes/records?page=1&perPage=30',
        // like using getServerSideProps()
        { cache: 'no-store' }
    )
    const data = await res.json();
    return data?.items as any[]
}

export default async function NotesPages() {
    const notes = await getNotes()
    return (
        <div>
            <h1>Notes</h1>
            <div className={styles.grid}>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />;
                })}
            </div>

            <CreatNote />
        </div>
    )
}

function Note({ note }: any) {
    const { id, title, content, created } = note || {};

    return (
        <Link href={`notes/${id}`}>
            <div className={styles.note}>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    )
}