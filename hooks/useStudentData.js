import { useState, useEffect } from "react";
import { fetchStudents } from "@/services/api";

export const useStudentData = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const data = await fetchStudents();
            setStudents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const refreshStudents = async () => {
        setRefreshing(true);
        await loadStudents();
        setRefreshing(false);
    };

    useEffect(() => { loadStudents().then(); }, []);

    return { students, loading, refreshing, refreshStudents };
};
