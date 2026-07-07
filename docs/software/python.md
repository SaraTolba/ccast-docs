# Using Python on CCAST

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Using Python on CCAST](https://kb.ndsu.edu/it/126857). Formatting (headings, code blocks, tables, images) needs review before publishing.

This article discusses the different versions and types of Python installations available on CCAST, how to use them, and how to create custom
environments with your own list of packages.

## Python installations available on CCAST

There are several ways to run Python on CCAST. Below is a list of the different Python installations available
and how to use them.

## Base (operating system) Python

Python is installed standard as part of the operating system on all CCAST servers (login and compute
nodes). These versions are available simply by logging into the system with a terminal and running python.
This will launch a Python interpreter from one of the following locations:
/usr/bin/python
/usr/bin/python2
/usr/bin/python3
On newer systems (e.g. Thunder Prime) running python will default to Python version 3, whereas on older
systems (e.g. Thunder) running python will default to Python version 2. When in doubt, the best practice is
to explicitly run the version you want by calling either python2 or python3.
The default, operating system Python installation is good for light scripting, or for code that only uses
what’s available in the base Python distribution. If you need to make use of third-party packages in your
Python code, consider using one of the other Python installations mentioned below.

## Basic versioned Python modules

There are several Python versions available via the modules framework. To view Python versions available via
the modules system, run module avail python. Here are the stable versions available as modules on CCAST:
python2/2.7.18
python/3.8.6-gcc-2pmf
python/3.8.6-intel-uly7
python/3.9.9
python/3.10.14
python/3.11.9
python/3.12.3
To load one of these modules, e.g. python2/2.7.18, run module load python2/2.7.18 in your CCAST terminal
session.
Like the base operating-system Python versions, these only include a basic Python distribution with
minimal third-party packages. The benefit, however, is that these are strictly versioned and are consistent
across nodes. Whereas, the base operating-system Python distributions are subject to version changes if
the systems are updated.

## Creating custom Python environments

There are two different ways CCAST users can create their own Python environments using venv virtual
environments. Instructions for each are provided below.

## Pythonvirtual environments

[Python virtual environments](https://docs.python.org/3/library/venv.html) use the pip package manager
and a basic versioned Python distribution. Here are the basic steps:
1.Load a Python3 module
```bash
module load python/3.12.2
```

2.Create the virtual environment
python -m venv myenv
This will create a directory named myenv in your current working directory, containing a link to the Python
interpreter as well as folders for libraries and other supporting files. For consistency, virtual environment
folders should not be moved once created, so make sure you are in the directory you want before creating
the environment.
If the above command succeeds, you can now unload the Python module:
```bash
module unload python/3.12.2
```

3.Activate yourvirtual environment
```bash
source myenv/bin/activate
```

Upon activating the virtual environment, you should see your terminal prompt change from something
like this:
[user.name@login0003 ~]$
to something like this:
(myenv) [user.name@login0003 ~]$
This is to remind you that you are “inside” the virtual environment.
4. Upgrade pip and install packages
With a new virtual environment, it is always a good idea to first update the pip package manager:
```bash
pip install --upgrade pip
```

After this, you can install the packages you need. For example, to install numpy:
```bash
pip install numpy
```

5.Exiting the virtual environment
When you are done working in the virtual environment, simply run:
deactivate
Your terminal prompt will revert to normal to indicate that you are no longer in the virtual environment.
To use the environment again in the future, rerun the source command from step 3.
Integrating custom Python environments with Jupyter Notebook
In addition to running Python jobs via the batch scheduler, CCAST users can run Python interactively
[through the Jupyter Notebook](https://jupyter.org/) app in Open OnDemand
<https://ondemand.ccast.ndsu.edu> . To launch a Jupyter session, login to CCAST’s Open OnDemand
<https://ondemand.ccast.ndsu.edu> service and select “Jupyter” from the “Interactive Apps” menu.
By default, Jupyter launches with one of CCAST's provided modules, in order to provide a standard
environment with popular packages for beginners to get started quickly. More advanced users may want
to integrate their own custom Python environments with the Jupyter app. To do so, follow these steps:

## Activate your Python environment

For virtual environments:
```bash
source path/to/virtual_environment/bin/activate
```

Then, ensure Jupyter is in this environment:
```bash
pip install jupyter
```

Install the environment as a ipykernel
For virtual environments:
python -m ipykernel install --user --name=MyEnvName
Note: The name you assign with the --name command will be the name that appears in the Jupyter app.
4.Launch a Jupyter Notebook session and create anew notebookwithyourkernel
In the Jupyter interface, select the “New” dropdown on the right and you should see your custom kernel.
Selecting it will launch a new notebook session with your custom environment.
5.Managing Jupyterkernels
To see a list of configured kernels from the terminal:
jupyter kernelspec list
To remove a kernel:
jupyter kernelspec remove MyEnv
Keywords:
python, python2, python3, anaconda, anaconda3, miniconda, miniconda3, virtual environments, jupyter notebook
Suggest keywords
Doc ID: 126857
Owned by: Nick D. in NDSU IT Knowledge Base
Created: 2023-03-24
Updated: 2026-06-23
Sites: NDSU IT Knowledge Base
Clean URL: https://kb.ndsu.edu/it/ccast-python
[Helpful 3 Unhelpful 1 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=126857)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=126857)
