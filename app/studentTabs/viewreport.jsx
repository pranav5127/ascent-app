import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function StudentReportScreen() {
    const [reports, setReports] = useState([])
    const [selectedView, setSelectedView] = useState('monthly')

    useEffect(() => {
        fetchReports()
    }, [selectedView])

    const fetchReports = async () => {
    }

    const renderReportItem = ({ item }) => (
        <View style={styles.reportCard}>
            <Text style={styles.reportTitle}>{item.title}</Text>
            <Text style={styles.reportDate}>{item.date}</Text>
            <Text style={styles.reportSummary}>{item.summary}</Text>
            <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View Details</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.toggleWrapper}>
                <TouchableOpacity
                    style={[styles.toggleBtn, selectedView === 'monthly' && styles.activeToggle]}
                    onPress={() => setSelectedView('monthly')}
                >
                    <Text style={styles.toggleText}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleBtn, selectedView === 'weekly' && styles.activeToggle]}
                    onPress={() => setSelectedView('weekly')}
                >
                    <Text style={styles.toggleText}>Weekly</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={reports}
                renderItem={renderReportItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6E9E2', padding: 10 },
    toggleWrapper: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
    toggleBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
    },
    activeToggle: { backgroundColor: '#e75a37' },
    toggleText: { color: '#000', fontWeight: '600' },
    listContainer: { paddingBottom: 20 },
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
