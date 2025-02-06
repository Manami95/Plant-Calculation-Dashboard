import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    color: '#1e3a8a',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b'
  },
  section: {
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1e3a8a',
    marginBottom: 12,
    fontWeight: 'bold',
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 4
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8
  },
  label: {
    width: '30%',
    fontSize: 11,
    color: '#64748b'
  },
  value: {
    flex: 1,
    fontSize: 11,
    color: '#0f172a'
  },
  table: {
    marginTop: 10
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
    padding: 8
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#f1f5f9',
    borderBottomWidth: 1,
    padding: 8
  },
  tableCell: {
    fontSize: 10,
    color: '#0f172a'
  },
  col1: {
    width: '40%'
  },
  col2: {
    width: '30%'
  },
  col3: {
    width: '30%'
  },
  totalSection: {
    marginTop: 20,
    borderTop: 2,
    borderTopColor: '#e2e8f0',
    paddingTop: 15
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  totalLabel: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: 'bold',
    marginRight: 20
  },
  totalValue: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10
  }
});

interface PDFDocumentProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  plantData: {
    type: string;
    capacity: number;
    BOD: number;
    COD: number;
    pH: number;
    TSS: number;
    OilGrease: number;
    Nitrogen: number;
  };
  equipmentData: Record<string, any>;
  totalCost: number;
}

const PDFDocument = ({ userData, plantData, equipmentData, totalCost }: PDFDocumentProps) => {
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Plant Price Calculator Report</Text>
          <Text style={styles.subtitle}>Generated on {formatDate()}</Text>
        </View>

        {/* User Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{userData.company}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
        </View>

        {/* Plant Specifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plant Specifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Plant Type:</Text>
            <Text style={styles.value}>{plantData.type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Capacity:</Text>
            <Text style={styles.value}>{plantData.capacity} KLD</Text>
          </View>
          
          {/* Parameters Grid */}
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>BOD:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.BOD} mg/L</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>COD:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.COD} mg/L</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>pH:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.pH}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>TSS:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.TSS} mg/L</Text>
              </View>
            </View>
          </View>
          <View style={[styles.row, { marginTop: 5 }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>Oil & Grease:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.OilGrease} mg/L</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>Nitrogen:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.Nitrogen} mg/L</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Equipment List Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Details</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>Equipment Name</Text>
              <Text style={[styles.tableCell, styles.col2]}>Quantity</Text>
              <Text style={[styles.tableCell, styles.col3]}>Price (₹)</Text>
            </View>
            {Object.entries(equipmentData).map(([id, equipment]: [string, any]) => (
              <View key={id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>{equipment.name}</Text>
                <Text style={[styles.tableCell, styles.col2]}>{equipment.quantity}</Text>
                <Text style={[styles.tableCell, styles.col3]}>
                  {equipment.totalPrice?.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          {/* Total Cost */}
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Cost:</Text>
              <Text style={styles.totalValue}>₹ {totalCost.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This is a computer-generated document. No signature is required.
        </Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
