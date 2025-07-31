import pandas as pd
import xml.etree.ElementTree as ET
from xml.dom import minidom
import zipfile
import os

def generate_testcase_xml_and_zip(file_path):
    # Load all sheets from the Excel file
    xls = pd.ExcelFile(file_path, engine='openpyxl')
    sheet_names = xls.sheet_names

    # Create a temporary directory to store XML files
    temp_dir = "temp_testcases"
    os.makedirs(temp_dir, exist_ok=True)

    xml_files = []

    for sheet in sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet)

        steps = []
        step_no = 1
        testcase_index = 1
        

        for _, row in df.iterrows():
            s_no = str(row['S.No']) if 'S.No' in row and pd.notna(row['S.No']) else ""
            section = str(row['Section']) if 'Section' in row and pd.notna(row['Section']) else ""
            step_name = str(row['Step Name']) if 'Step Name' in row and pd.notna(row['Step Name']) else ""
            user_input = str(row['User Input']) if 'User Input' in row and pd.notna(row['User Input']) else ""

            # If 'End' is encountered, finalize current XML and reset
            if s_no.strip().lower() == "end":
                if steps:
                    testcase_name = f"{sheet}_TestCase_{testcase_index}"
                    root = ET.Element("TestSpecification", xmlns="TestSpecification.xsd")
                    testcases_elem = ET.SubElement(root, "TestCases")
                    testcase_elem = ET.SubElement(testcases_elem, "TestCase")
                    ET.SubElement(testcase_elem, "TestCaseName").text = testcase_name
                    ET.SubElement(testcase_elem, "MediaType").text = "Voice"
                    ET.SubElement(testcase_elem, "FolderPath").text = "Hari_Prasath"
                    ET.SubElement(testcase_elem, "Description")
                    ET.SubElement(testcase_elem, "PhoneNo").text = "18339991298"
                    ET.SubElement(testcase_elem, "PhoneNoLocal").text = "false"
                    ET.SubElement(testcase_elem, "LocalCallInfoCountryCode")
                    ET.SubElement(testcase_elem, "LocalCallInfoCountry")
                    ET.SubElement(testcase_elem, "LocalCallInfoCarrier")
                    ET.SubElement(testcase_elem, "LocalCallInfoState")
                    ET.SubElement(testcase_elem, "LocalCallInfoCity")
                    ET.SubElement(testcase_elem, "LocalCallInfoProviderType")
                    ET.SubElement(testcase_elem, "Notes")
                    ET.SubElement(testcase_elem, "AlertMsg")
                    ET.SubElement(testcase_elem, "PreConnectAudio")
                    ET.SubElement(testcase_elem, "AlertFrequency").text = "Once"
                    ET.SubElement(testcase_elem, "MinorThresholdCriticalCount").text = "3"
                    ET.SubElement(testcase_elem, "MajorThresholdCriticalCount").text = "1"
                    ET.SubElement(testcase_elem, "DataInputs")

                    steps_elem = ET.SubElement(testcase_elem, "Steps")
                    ringing_step = ET.SubElement(steps_elem, "RingingStep")
                    ET.SubElement(ringing_step, "MinPauseTime").text = "0"
                    ET.SubElement(ringing_step, "MaxPauseTime").text = "0"
                    ET.SubElement(ringing_step, "MinorThresholdTime").text = "5"
                    ET.SubElement(ringing_step, "MajorThresholdTime").text = "10"

                    callsteps_elem = ET.SubElement(steps_elem, "CallSteps")
                    for step in steps:
                        callsteps_elem.append(step)

                    rough_string = ET.tostring(root, 'utf-8')
                    reparsed = minidom.parseString(rough_string)
                    pretty_xml = reparsed.toprettyxml(indent="  ")

                    xml_filename = os.path.join(temp_dir, f"{testcase_name}.xml")
                    with open(xml_filename, "w", encoding="utf-8") as f:
                        f.write(pretty_xml)
                    xml_files.append(xml_filename)

                    testcase_index += 1
                    steps = []
                    step_no = 1
                continue

            # Step from Step Name
            if step_name:
                step = ET.Element("Step")
                ET.SubElement(step, "StepNo").text = str(step_no)
                ET.SubElement(step, "Description").text = section
                ET.SubElement(step, "ExpectedText").text = f"Please enter the {step_name}"
                ET.SubElement(step, "ExpectedExchangeType").text = "MPSR"
                ET.SubElement(step, "ReplyText")
                ET.SubElement(step, "ReplyExchangeType").text = "DTMF"
                ET.SubElement(step, "MinorThresholdTime").text = "3"
                ET.SubElement(step, "MajorThresholdTime").text = "5"
                ET.SubElement(step, "MinPauseTime").text = "0"
                ET.SubElement(step, "MaxPauseTime").text = "0"
                ET.SubElement(step, "MajorConfidenceLevel").text = "60"
                ET.SubElement(step, "MinorConfidenceLevel").text = "80"
                ET.SubElement(step, "PostSpeechSilenceTimeout").text = "2.5"
                ET.SubElement(step, "BlockPath")
                steps.append(step)
                step_no += 1

            # Step from User Input
            if user_input:
                step = ET.Element("Step")
                ET.SubElement(step, "StepNo").text = str(step_no)
                ET.SubElement(step, "Description").text = section + "_reply"
                ET.SubElement(step, "ExpectedText")
                ET.SubElement(step, "ExpectedExchangeType").text = "MPSR"
                ET.SubElement(step, "ReplyText").text = user_input
                reply_type = "DTMF" if user_input.isdigit() else "Speech"
                ET.SubElement(step, "ReplyExchangeType").text = reply_type
                ET.SubElement(step, "MinorThresholdTime").text = "0"
                ET.SubElement(step, "MajorThresholdTime").text = "0"
                ET.SubElement(step, "MinPauseTime").text = "0"
                ET.SubElement(step, "MaxPauseTime").text = "0"
                ET.SubElement(step, "MajorConfidenceLevel").text = "0"
                ET.SubElement(step, "MinorConfidenceLevel").text = "0"
                ET.SubElement(step, "PostSpeechSilenceTimeout").text = "0"
                ET.SubElement(step, "BlockPath")
                steps.append(step)
                step_no += 1

    # Create ZIP file
    # with zipfile.ZipFile(zip_name, 'w') as zipf:
    #     for file in xml_files:
    #         zipf.write(file, arcname=os.path.basename(file))

    print(f"Folder with files are created: {temp_dir}")

# Run the function with the uploaded Excel file
generate_testcase_xml_and_zip("Automate.xlsx")