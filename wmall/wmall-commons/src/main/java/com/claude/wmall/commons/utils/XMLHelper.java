package com.claude.wmall.commons.utils;

import java.io.*;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.io.*;
import org.dom4j.util.XMLErrorHandler;
import org.dom4j.*;
import org.xml.sax.EntityResolver;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXParseException;

/**
 * Small helper class deal with the xml.
 * 
 * @author xf
 * 
 */
public final class XMLHelper {

	private static final Log log = LogFactory.getLog(XMLHelper.class);
	private DOMReader domReader;
	private SAXReader saxReader;

	/**
	 * Create a dom4j SAXReader which will append all validation errors to
	 * errorList
	 */
	@SuppressWarnings("rawtypes")
	public SAXReader createSAXReader(String file, List errorsList,
			EntityResolver entityResolver) {
		if (saxReader == null)
			saxReader = new SAXReader();
		saxReader.setEntityResolver(entityResolver);
		saxReader.setErrorHandler(new ErrorLogger(file, errorsList));
		saxReader.setMergeAdjacentText(true);
		saxReader.setValidation(true);
		return saxReader;
	}

	/**
	 * Create a dom4j DOMReader
	 */
	public DOMReader createDOMReader() {
		if (domReader == null)
			domReader = new DOMReader();
		return domReader;
	}

	public static Element generateDom4jElement(String elementName) {
		return DocumentFactory.getInstance().createElement(elementName);
	}

	public static Document parseXMLFromString(String source) {
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(source);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return doc;
	}

	public static Document parseXMLFromFile(File sourceFile) {
		SAXReader saxReader = new SAXReader();
		Document document = null;
		try {
			document = saxReader.read(sourceFile);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return document;

	}

	public static Document parseXMLFromFile(String sourceFile){
		File file = new File(sourceFile);
		return parseXMLFromFile(file);
	}

	public Document parseXMLFromInputStream(InputStream in) {
		SAXReader xmlReader = new SAXReader();
		Document doc = null;
		try {
			doc = xmlReader.read(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doc;
	}

	public static class ErrorLogger implements ErrorHandler {
		private String file;
		@SuppressWarnings("rawtypes")
		private List errors;

		@SuppressWarnings("rawtypes")
		ErrorLogger(String file, List errors) {
			this.file = file;
			this.errors = errors;
		}

		@SuppressWarnings("unchecked")
		public void error(SAXParseException error) {
			log.error("Error parsing XML: " + file + '('
					+ error.getLineNumber() + ") " + error.getMessage());
			errors.add(error);
		}

		public void fatalError(SAXParseException error) {
			error(error);
		}

		public void warning(SAXParseException warn) {
			log.warn("Warning parsing XML: " + file + '('
					+ warn.getLineNumber() + ") " + warn.getMessage());
		}
	}

	
	/**
	 * 
	 * @param xmlStr  xmldoc
	 * @param schemaUrl  
	 * @return
	 */
	@SuppressWarnings("unused")
	public static boolean validateXmlBySchema(String xmlStr, String schemaUrl) {

		boolean isSuccess = true;

		String outString = "";

		String content = xmlStr.trim();

		try {
			SAXReader reader = new SAXReader(true);
			reader.setFeature("http://xml.org/sax/features/validation", true);
			reader.setFeature(
					"http://apache.org/xml/features/validation/schema", true);
			reader
					.setProperty(
							"http://apache.org/xml/properties/schema/external-noNamespaceSchemaLocation",
							schemaUrl);
			XMLErrorHandler errorHandler = new XMLErrorHandler();
			reader.setErrorHandler(errorHandler);

			Document document = reader.read(new ByteArrayInputStream(content
					.getBytes("utf-8")));
			if (errorHandler.getErrors().hasContent()) {
				XMLWriter writer = new XMLWriter(OutputFormat
						.createPrettyPrint());
				writer.write(errorHandler.getErrors());
				isSuccess = false;
			} else {
				isSuccess = true;
				outString = "validate success.";
			}
		} catch (Exception e) {
			outString = "validate XML Document Exception :\n" + e;
		} finally {
			log.debug("\n" + outString);
		}
		return isSuccess;
	}
}
