import pandas as pd
from zmq import USE_FD

SELECTED_FEATURES = [
    # Patient's features
    "Patient Age",
    "Gender",
    "Birth defects",
    "Blood cell count (mcL)",
    "White Blood cell count (thousand per microliter)",
    "Blood test result",
    "Respiratory Rate (breaths/min)",
    "Heart Rate (rates/min)",
    "Folic acid details (peri-conceptional)",
    "H/O serious maternal illness",
    "H/O substance abuse",
    "H/O radiation exposure (x-ray)",
    "Birth asphyxia",

    # Mother's features
    "Genes in mother's side",
    "Inherited from father",
    "Maternal gene",
    "Paternal gene",
    "Mother's age",
    "Father's age",
    "Assisted conception IVF/ART",
    "History of anomalies in previous pregnancies",
    "No. of previous abortion",

    # Target columns
    "Genetic Disorder",
    "Disorder Subclass",
]

USEFUL_FEATURES = [
    i.replace(' ', '_').replace("'s", '').replace('.', '').lower() 
    for i in SELECTED_FEATURES
    ]


def create_data():
    raw_data = pd.read_csv("../data/train.csv")
    pd.read_csv("../data/train.csv")
    data = raw_data[SELECTED_FEATURES].rename(columns={ SELECTED_FEATURES[i]: USEFUL_FEATURES[i] for i in range(len(SELECTED_FEATURES))})
    data = data.dropna(subset=["genetic_disorder", "disorder_subclass"])
    return data

def export_data():
    data = create_data()
    data.to_csv("../data/data.csv", index=False)

if __name__ == "__main__":
    export_data()