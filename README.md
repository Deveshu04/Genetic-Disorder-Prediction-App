# Genetic Disorder Prediction App

## Table of Content
  * [Overview](#overview)
  * [Demo](#demo)
  * [Motivation](#motivation)
  * [Installation](#installation)
  * [Technologies Used](#technologies-used)
  * [Directory Tree](#directory-tree)
  * [To Do](#to-do)
  * [Bug / Feature Request](#bug--feature-request)
  * [Team](#team)
  * [License](#license)
  * [Credits](#credits)


## Overview


### Dataset
The dataset used for this project is the [Data of Genomes and Genetics](https://www.kaggle.com/datasets/aryarishabh/of-genomes-and-genetics-hackerearth-ml-challenge) from kaggle.


## Demo





## Installation

> [!IMPORTANT]
> ### Environment Variables
> Create a `.env` file in the backend directory to store your environment variables:
> ```
> MONGO_URI=mongodb://localhost:27017/genetic_disorder_db
> FLASK_APP=run.py
> FLASK_ENV=development
> ```

### 1. Clone the Repository

```sh
git clone https://github.com/Deveshu04/Genetic-Disorder-Prediction-App.git
cd Genetic-Disorder-Prediction-App
```

### 2. Set Up the Backend (Flask)

1. Create and activate a virtual environment:
    ```
    python3 -m backend/venv env         # python -m venv env on Windows
    source backend/venv/bin/activate    # .\backend\venv\Scripts\activate on Windows
    ```

2. Install dependencies:
    ```
    pip install -r backend/requirements.txt
    ```

3. Start MongoDB (Ensure MongoDB is installed and running on your system):
    ```
    mongod
    ```

4. Run the Flask server:
    ```
    cd backend/
    flask run
    ````

### 3. Set Up the Frontend (Next.js)
1. Install dependencies:
    ```
    npm install
    ```

2. Start the Next.js development server:
    ```
    npm run dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Technologies Used
- Node.js
- Next.js
- Tailwind CSS
- Flask
- Scikit-learn

## Directory Tree
```
.
├── app/
│   ├── components/
│   │   ├── SignupForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── InsightCharts.tsx
│   │   └── PredictionForm.tsx
│   ├── dashboard/
│   │   └── page.tsx
|   ├── insights/
│   │   └── page.tsx
|   ├── styles/
│   │   ├── globals.css
│   ├── favicon.ico
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   ├── models/
│   │   │   ├── model.pkl
│   │   │   └── preprocess.py
│   │   ├── notebooks/
│   │   │   └── analysis.ipynb
│   ├── venv/
│   ├── requirements.txt
│   └── run.py
├── README.md
├── next.config.mjs
├── next-env.d.tx
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
└── .gitignore
```


### Columns
#### Patient Details
- Patient Age - Integer (Required)
- Gender - M/F (Required)
- Birth defects - Singular/ Multiple (Required)
- Blood cell count (mcL) - Float (Required)
- White Blood cell count (thousand per microliter) - Float (Required)
- Blood test result - Normal/Abnormal/Inconclusive/Inconclusive (Required)
- Respiratory Rate (breaths/min) - Normal (30-60) or Tachypnea (Required) - Normal
- Heart Rate (rates/min) - Normal (60-100) or Tachycardia (Required) - Normal
- Folic acid details - Y/N (Required) - Y
- H/O serious maternal illness - Y/N (Required)
- H/O substance abuse - Y/N (Required) - N

##### Dropdown (Additional Information)
- H/O radiation exposure (x-ray) - Y/N (Optional) - N
- Birth asphyxia - Y/N (Optional) - Y

H/0 = History of

#### Family Medical History
- Genes in Mother's side - Y/N (Required) - Y
- Inherited from Father - Y/N (Required) - N
- Maternal gene - Y/N (Optional) - Y
- Paternal gene - Y/N (Optional) - N
- Mother's age - Integer (Required)
- Father's age - Integer (Required)
- Assisted conception IVF/ART - Y/N (Required) - N
- History of anomalies in previous pregnancies - Y/N (Required) - N
- No. of previous abortion - Integer(0,1,2,3,>3) (Required) - 0
