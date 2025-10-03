import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '@/context/AuthContext'

export default function StudentReportScreen() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(false)
    const { userProfile } = useContext(AuthContext)

    useEffect(() => {
        fetchReports()
    }, [])

    const fetchReports = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://ascent-backend.onrender.com/reports/student/${userProfile?.id}`, {
                headers: { Accept: 'application/json' }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch reports')
            }

            const data = await response.json()

            const sortedReports = data.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )

            const parsedReports = sortedReports.map(report => {
                let parsedText = {}
                try {
                    parsedText = JSON.parse(report.report_text)
                } catch {
                    parsedText = { summary: 'No summary available', detailed_report: '' }
                }

                return {
                    id: report.id,
                    title: report.period,
                    date: new Date(report.created_at).toLocaleDateString(),
                    summary: parsedText.summary,
                    details: parsedText.detailed_report
                }
            })

            setReports(parsedReports)
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'Unable to fetch reports at the moment.')
        } finally {
            setLoading(false)
        }
    }

    const renderReportItem = ({ item }) => (
        <View style={styles.reportCard}>
            <Text style={styles.reportDate}>{item.date}</Text>
            <Text style={styles.reportSummary} numberOfLines={3}>{item.summary}</Text>
            <TouchableOpacity
                style={styles.viewBtn}
                onPress={() =>
                    Alert.alert(item.title, item.details || 'No detailed report available')
                }
            >
                <Text style={styles.viewBtnText}>View Details</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#e75a37" style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={reports}
                    renderItem={renderReportItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            No reports available.
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6E9E2', padding: 10 },
    listContainer: { paddingBottom: 20 },
    emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' },
    reportCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    reportTitle: { fontSize: 16, fontWeight: '700', marginBottom: 5 },
    reportDate: { fontSize: 12, color: 'gray', marginBottom: 10 },
    reportSummary: { fontSize: 14, color: '#333', marginBottom: 10 },
    viewBtn: {
        alignSelf: 'flex-start',
        backgroundColor: '#e75a37',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    viewBtnText: { color: '#fff', fontWeight: '600' },
})
