package com.claude.wmall.commons.sqlFactory;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Properties;


public class BeanHelper {
	public static String getPackagesSQL() {
		String packagesSql = "package com.claude.wmall.shopping.domain;       \n";
		packagesSql += "                                        \n";
		packagesSql += "import javax.persistence.Column;        \n";
		packagesSql += "import javax.persistence.Entity;        \n";
		packagesSql += "import javax.persistence.GeneratedValue;\n";
		packagesSql += "import javax.persistence.GenerationType;\n";
		packagesSql += "import javax.persistence.Id;            \n";
		packagesSql += "import javax.persistence.Table;         \n";
		packagesSql += "import javax.persistence.Transient;     \n";
		//packagesSql += "import javax.persistence.Version;     \n";
		packagesSql += "import net.sf.json.JSONObject;          \n";
		packagesSql += "import com.claude.wmall.commons.utils.Jsonable;      \n";

		return packagesSql;
	}

	public void getConnAndTableStruct(String tableName) {
		Connection connection = null;
		PreparedStatement pstmt = null;
		ResultSetMetaData rsmd = null;
		try {
			Properties properties = new Properties();
			try {
				properties.load(this.getClass().getResourceAsStream(
						"/jdbc.properties"));
			} catch (IOException e) {
				e.printStackTrace();
			}
			String driver = properties.getProperty("jdbc.driver");
			String url = properties.getProperty("jdbc.url");
			String username = properties.getProperty("jdbc.username");
			String password = properties.getProperty("jdbc.password");

			Class.forName(driver);
			connection = DriverManager.getConnection(url, username, password);
			String resSQL = getPackagesSQL();
			resSQL += "@Entity\n";
			// tableName T_OperLog
			resSQL += "@Table(name = \"" + tableName + "\")\n";
			String beanName = tableName.substring(2);
			resSQL += "public class " + beanName + " implements Jsonable{\n";
			pstmt = (PreparedStatement) connection
					.prepareStatement("select * from " + tableName);
			// pstmt.execute(); //这点特别要注意:如果是Oracle而对于mysql可以不用加.
			rsmd = (ResultSetMetaData) pstmt.getMetaData();

			// for (int i = 1; i < rsmd.getColumnCount() + 1; i++) {
			// System.out.println(rsmd.getColumnName(i)+ " --- "
			// +rsmd.getColumnTypeName(i)
			// +" --- " +rsmd.getColumnClassName(i)+
			// " --- "+rsmd.getTableName(i));
			// }
			for (int i = 1; i < rsmd.getColumnCount() + 1; i++) {
				String colName = rsmd.getColumnName(i);
				String colType = rsmd.getColumnClassName(i);
				if (colName.toUpperCase().equals("ID")) {
					colType="java.lang.Integer";
				}
				else if(colType.equalsIgnoreCase("java.sql.Timestamp"))
				{
					colType="java.util.Date";
				}
				resSQL += "private " + colType + " "
						+ colName + " ;\n";
				resSQL += "\n";
				if (colName.toUpperCase().equals("ID")) {
					resSQL += "@Id\n";
					resSQL += "@GeneratedValue(strategy=GenerationType.IDENTITY)\n";
				}else if(colName.toUpperCase().equals("VVERSION")){
					resSQL += "@Version";
				}
				resSQL += "@Column(name = \"" + colName + "\")\n";
				resSQL += "public " + colType + " get"
						+ colName + "() {\n";
				resSQL += "return " + colName + ";\n";
				resSQL += "}\n";
				resSQL += "public void set" + colName + "("+colType+" " + colName
						+ ") {\n";
				resSQL += "this." + colName + " = " + colName + ";\n";
				resSQL += "}\n";
			}
			resSQL += "\n";
			resSQL += "@Transient\n";
			resSQL += "@Override\n";
			resSQL += "public String getJsonObject() {\n";
			resSQL += "JSONObject jsonObject = new JSONObject();\n";
			for (int i = 1; i < rsmd.getColumnCount() + 1; i++) {
				String colName = rsmd.getColumnName(i);
				resSQL += "jsonObject.put(\"" + colName + "\", get" + colName
						+ "());\n";
			}
			resSQL += "return jsonObject.toString();\n";
			resSQL += "}\n";
			resSQL += "}\n";

			System.out.println(resSQL);
		} catch (ClassNotFoundException cnfex) {
			cnfex.printStackTrace();
		} catch (SQLException sqlex) {
			sqlex.printStackTrace();
		}

	}

	public static void main(String[] args) {
		new BeanHelper().getConnAndTableStruct("T_Area");
	}
}
