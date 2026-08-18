# 📚 Milestone 3: RAG Knowledge Base for FranchiseOps AI

This milestone focuses on developing a **Retrieval-Augmented Generation (RAG) knowledge base** for the **FranchiseOps AI** system. The purpose is to collect reliable franchise-operation information, convert it into searchable documents, generate semantic embeddings, and store them in a FAISS vector database.

The RAG pipeline allows FranchiseOps AI to retrieve relevant information before generating an answer. This helps the system provide responses that are more **context-aware, reliable, and useful for franchise business operations**.

# 🎯 Objectives

* Build a centralized knowledge repository for franchise operations.
* Collect information from reliable websites and official PDF documents.
* Automatically extract and preprocess useful text.
* Divide large documents into meaningful chunks.
* Generate semantic embeddings using HuggingFace models.
* Build and store a FAISS vector index.
* Test the knowledge base using practical franchise-related queries.

# 🛠️ Technologies Used

* Python
* Google Colab
* LangChain
* FAISS
* HuggingFace Sentence Transformers
* BeautifulSoup
* Requests
* PyMuPDF (fitz)
* TextBlob
* VADER Sentiment
* Google Drive

# 📂 Project Structure

```text
FranchiseOps_AI/
│
├── rag_documents/
│   ├── html_*.txt
│   ├── pdf_*.txt
│   ├── manifest.json
│   └── kb_franchise.json
│
├── franchiseops_faiss_index/
├── RAG_KnowledgeBase.ipynb
└── README.md
```

# 🚀 RAG Pipeline Workflow

## 1. Environment Configuration

The required Python packages are installed and the Google Drive environment is configured. A dedicated directory is created to store downloaded and processed knowledge documents.

Warning messages and other environment settings are also configured to keep notebook execution clean.

## 2. Knowledge Source Collection

The knowledge base is created using information from reliable online sources and official documents.

### 🌐 Web-Based Sources

The system collects information related to:

* Franchise and marketing management
* Customer experience
* Employee and HR management
* Food safety
* FSSAI regulations
* Labour regulations
* OSHA safety guidelines
* WHO recommendations
* FDA information
* Government resources
* Franchise operational practices

### 📄 PDF Resources

Official PDF documents are also collected, including:

* Food safety regulations
* FSSAI documents
* WHO publications
* OSHA guidelines
* Labour-related documents
* Government manuals
* Compliance guidelines
* Franchise-related regulations

This combination provides both **operational knowledge and regulatory information**.

## 3. Web Page Extraction

The scraper sends requests to selected websites and processes the returned HTML content using **BeautifulSoup**.

Unnecessary elements such as:

* Scripts
* Styles
* Navigation sections
* HTML tags
* Other irrelevant page elements

are removed before the useful textual information is saved as `.txt` files.

## 4. PDF Link Detection

While processing websites, the system also searches for PDF links available within the pages.

The pipeline handles:

* Relative PDF URLs
* Absolute URLs
* Duplicate links
* Automatic PDF discovery

This makes it possible to expand the knowledge base without manually identifying every document.

## 5. PDF Text Extraction

Discovered PDF documents are downloaded and processed using **PyMuPDF (fitz)**.

The extracted text is stored as individual text files so that the PDF information can be processed together with the scraped web content.

## 6. Manifest-Based Tracking

A `manifest.json` file is maintained to keep track of processed resources.

It helps the system:

* Avoid downloading the same resource repeatedly.
* Record successful processing.
* Identify failed downloads.
* Continue processing from previous runs.

This makes the data collection pipeline more organized and resumable.

## 7. Loading Documents into LangChain

The generated `.txt` files are loaded as **LangChain Document objects**.

Each document contains:

* Extracted textual content
* Source information
* Relevant metadata

This creates a common format for the later chunking and embedding stages.

## 8. Franchise SOP Knowledge

In addition to external sources, the knowledge base contains manually prepared **Standard Operating Procedures (SOPs)** for franchise operations.

Examples include:

* Freezer temperature practices
* Food hygiene procedures
* Employee requirements
* Marketing ROI guidelines
* Customer complaint management
* Store opening procedures
* Workplace safety
* FSSAI compliance

Adding structured SOP information makes the knowledge base more relevant to actual franchise-management scenarios.

## 9. Document Chunking

Large documents are divided into smaller sections using:

**RecursiveCharacterTextSplitter**

Configuration:

* **Chunk Size:** 1000 characters
* **Chunk Overlap:** 100 characters

Chunking allows the retrieval system to identify specific sections of a document instead of processing an entire document at once.

## 10. Semantic Embedding Generation

Every text chunk is converted into a numerical vector using the **all-MiniLM-L6-v2** sentence-transformer model.

The model is suitable for this project because it is:

* Lightweight
* Fast
* Efficient
* Suitable for semantic similarity
* Practical for Google Colab environments

These embeddings represent the meaning of the text numerically.

## 11. FAISS Vector Index

The generated embeddings are stored in a **FAISS vector database**.

FAISS enables efficient similarity searching between a user's query and the stored document embeddings.

The index provides:

* Fast vector similarity search
* Efficient retrieval
* Semantic rather than simple keyword matching
* Reusable local storage

The completed FAISS index is saved for later integration with the FranchiseOps AI application.

## 12. Retrieval Validation

The RAG pipeline is tested using practical franchise-management questions.

Example queries include:

* What is the recommended freezer temperature?
* What are the employee requirements?
* What is the correct handwashing procedure?
* What penalties are associated with FSSAI violations?
* How should customer complaints be escalated?
* What marketing ROI threshold should be considered?
* How should employee performance be reviewed?

For every query, the system retrieves the most relevant document chunks along with their source metadata.

# 🔍 Technical Analysis

## Data Acquisition

The system automatically gathers information from selected websites and official documents to create a centralized franchise knowledge repository.

## Text Cleaning

Raw HTML content is cleaned by removing unnecessary page elements. This ensures that the knowledge base contains useful information instead of website navigation or formatting content.

## PDF Processing

PyMuPDF is used to extract machine-readable text from downloaded PDF documents. Documents that do not contain extractable text, such as some scanned PDFs, may require additional OCR processing.

## Knowledge Base Integration

The final repository combines:

* Web-based research
* Government information
* Regulatory documents
* Industry guidelines
* Franchise SOPs

into one searchable collection.

## Embedding Process

The text is divided into smaller chunks and transformed into vector representations using the HuggingFace sentence-transformer model.

Because the embeddings capture semantic meaning, similar questions can retrieve relevant information even when the query does not use exactly the same words as the source document.

## Semantic Retrieval

FAISS compares the query embedding with stored document vectors and returns the closest matches.

This allows FranchiseOps AI to retrieve information based on **meaning and context** rather than relying only on exact keyword matches.

# 📈 Key Features

* 🌐 Automated HTML content collection
* 📄 PDF discovery and processing
* 🧹 Text cleaning and preprocessing
* 📚 Centralized franchise knowledge repository
* 📋 SOP integration
* ✂️ Intelligent document chunking
* 🧠 Sentence-transformer embeddings
* 🔎 Semantic similarity search
* ⚡ FAISS-based retrieval
* 🗂️ Metadata management
* 📝 Manifest-based tracking
* 🧪 Retrieval validation with sample queries

# 📊 Expected Results

After completing the milestone, the system should generate:

* A collection of cleaned HTML documents
* Extracted PDF text files
* Curated franchise SOP information
* Processed document chunks
* Sentence embeddings
* A FAISS vector index
* Source metadata
* Relevant results for franchise-management queries

# ❓ Sample Queries

| Query                                        | Expected Retrieval              |
| -------------------------------------------- | ------------------------------- |
| What temperature should a freezer maintain?  | Freezer temperature SOP         |
| What are the basic staff requirements?       | Employee/HR guidelines          |
| What is the proper handwashing procedure?    | Food hygiene guidelines         |
| What happens after an FSSAI violation?       | FSSAI compliance information    |
| How should customer complaints be escalated? | Complaint-handling SOP          |
| What ROI should be expected from marketing?  | Marketing SOP                   |
| How can staff performance be evaluated?      | Employee performance guidelines |

# 🎓 Learning Outcomes

This milestone provides practical understanding of:

* RAG architecture
* Knowledge-base construction
* Web scraping
* HTML parsing with BeautifulSoup
* PDF processing with PyMuPDF
* Text preprocessing
* Document chunking
* Sentence embeddings
* Vector databases
* FAISS similarity search
* LangChain document handling
* Semantic information retrieval

# 🚀 Future Improvements

The current RAG knowledge base can be extended by:

* Connecting it with an LLM for answer generation.
* Building a conversational FranchiseOps AI chatbot.
* Adding automatic knowledge-base updates.
* Supporting multiple Indian languages.
* Introducing hybrid keyword + vector retrieval.
* Adding reranking for improved search accuracy.
* Deploying the RAG service as an API.
* Integrating retrieval with franchise performance monitoring.

# 👥 Team 4 Members

* R Jayasree
* Roshani Rajput
* Soundarya B
* Vangala Sanvi Reddy
* Atluri Venkata Siva Reddy

