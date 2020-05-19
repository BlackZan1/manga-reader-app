import { useState, useCallback, useEffect } from "react"

const useChapters = (chapters) => {
    let [chapter, setChapter] = useState([]);
    let [chapterPage, setChapterPage] = useState(0);

    useEffect(() => {
        setChapter(chapters[chapterPage]);
    }, [chapters, chapterPage])

    const nextChapterPage = useCallback(() => {
        let isEnd = chapterPage + 1 === chapters.length;

        setChapterPage(!isEnd ? chapterPage + 1 : chapterPage);
    }, [chapterPage, chapters])

    const prevChapterPage = useCallback(() => {
        let isBegining = chapter + 1 === 1;

        setChapterPage(!isBegining ? chapterPage - 1 : chapterPage);
    }, [chapter, chapterPage])

    const setPage = useCallback((page) => {
        setChapterPage(page);
    }, [])

    return {
        chapter,
        chapterPage,
        nextChapterPage,
        prevChapterPage,
        setPage
    }
}

export default useChapters;