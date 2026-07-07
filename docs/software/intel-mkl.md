# Using Intel Math Kernel Library (MKL) on HPC Clusters

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Using Intel Math Kernel Library (MKL) on HPC Clusters](https://kb.ndsu.edu/it/107848). Formatting (headings, code blocks, tables, images) needs review before publishing.

This document explains the syntax and usage of Intel Math Kernel Library (MKL) included in Intel oneAPI Toolkits, with examples for each usage
scenario.
1. Introduction to Intel MKL 
1. Types of MKL libraries 
2. General usage 
3. Linking with Intel MKL 
2. Examples using Intel MKL: C 
1. Dot product (sequential) 
2. Dot product (implicit parallelism) 
3. Eigenvalue problem 
3. Examples using Intel MKL: Fortran 
1. Dot product (sequential) 
2. Dot product (implicit parallelism) 
3. Eigenvalue problem 
4. Miscellaneous 
1. Helpful commands 
2. Why isn't my program working? 
Prerequisites
In general, high-performance computing (HPC) users should have a basic knowledge of Linux environment, HPC systems, and job scheduling
and workload [management systems (specifically, PBS Pro](https://www.altair.com/pbs-professional/) /OpenPBS used on the Thunder/Thunder
[Prime cluster at CCAST](https://www.ndsu.edu/ccast) ), and some Linux shell scripting experience. The essential information can be found in
[the CCAST User Guide](https://kb.ndsu.edu/107680) .
See also Using [Intel Compilers on HPC Clusters](https://kb.ndsu.edu/107847) for a general introduction of Intel oneAPI Toolkits
<https://software.intel.com/content/www/us/en/develop/tools/oneapi/all-toolkits.html> .

## Example files

All the source codes and job submission scripts discussed in this document can be found in the following compressed file
 on Thunder: /mmfs1/thunder/projects/ccastest/examples/intel_examples.tar.gz
 on Thunder Prime: /mmfs1/projects/ccastest/examples/intel_examples.tar.gz
Conventions used in this document
• Terminal commands are denoted by inline code prefixed with $, output omits the $
```bash
   $ echo You are the coolest programmer ever
```

You are the coolest programmer ever
• Code is denoted by code blocks
   if (hacker) {
       access_granted = True
   }
• Variable inputs are denoted by capital letters in brackets
   [PASSWORD]
1.Introduction to Intel MKL
[Intel Math Kernel Library](https://software.intel.com/content/www/us/en/develop/documentation/get-started-with-mkl-for-linux/top.html)  (Intel
MKL) is a math library that exploits the core counts and architectures of Intel CPUs to reach a high degree of optimization and parallelization. It
has implementations of many [standard math packages, like BLAS](https://www.netlib.org/blas/)  and LAPACK
<https://www.netlib.org/lapack/> . This means no code changes are required if these libraries are already being utilized, a developer merely
needs to link against Intel MKL.
Most routines in this library are parallelized behind the scenes, allowing programmers to utilize implicit parallelization
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-linux-developer-guide/top/managing-performance-and-memory/improvingperformance-with-threading.html>  when calling from sequential programs. These routines are thread safe
<[https://en.wikipedia.org/wiki/Thread_safety> , but caution](https://software.intel.com/content/www/us/en/develop/documentation/mkl-linuxdeveloper-guide/top/managing-performance-and-memory/improving-performance-with-threading/avoiding-conflicts-in-the-execution-environment.html)
 should be taken when using threaded MKL routines in applications already utilizing threading. Appropriate include files
<[https://software.intel.com/content/www/us/en/develop/documentation/mkl-linux-developer-guide/top/appendix-a-intel-math-kernel-library-languageinterfaces-support/include-files.html>  and compiler commands](https://software.intel.com/content/www/us/en/develop/documentation/mkl-linuxdeveloper-guide/top/linking-your-application-with-the-intel-math-kernel-library/linking-quick-start.html)  are required to use the libraries.
For examples on how to use MKL, multiple [code samples exist for C/C++](https://software.intel.com/content/www/us/en/develop/documentation/mkldeveloper-reference-c/top/appendix-d-code-examples.html)  [and Fortran](https://software.intel.com/content/www/us/en/develop/documentation/mkldeveloper-reference-fortran/top/appendix-e-code-examples.html)  on Intel’s developer reference site, and here
<https://software.intel.com/content/www/us/en/develop/tools/math-kernel-library/get-started.html>  on Intel’s get started page for MKL.
1.1 Types of MKLlibraries
• Basic Linear Algebra Subprograms (BLAS): vector, matrix-vector, and matrix-matrix operations.
• Sparse BLAS: Basic operations on sparse vectors and matrices.
• Sparse QR: A multifrontal sparse QR factorization method for solving a sparse system of linear equations.
• Linear Algebra PACKage (LAPACK): Solves systems of linear equations, least square problems, eigenvalue and singular value problems, and
Sylvester’s equations.
• Statistical Functions: Implements commonly used pseudorandom random number generators (RNG) with continuous distribution.
• Direct and Iterative Sparse Solvers: Several options for solving sparse linear systems of equations and a direct sparse solver based on
PARDISO*, called Intel MKL PARDISO.
• Vector Mathematics Functions: Computes core mathematical functions on vector arguments.
• Vector Statistics Functions: Generates vectors of pseudorandom numbers with different types of statistical distributions and perform
convolution and correlation computations.
• Fourier Transform Functions: Several options for computing Fast Fourier Transforms (FFTs).
1.2 General usage
• Include appropriate headers
• Use [appropriate MKL routines in C/C++](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top.html)
 [or Fortran](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top.html)
• Create compiler commands and link lines with Intel MKL Link Line Advisor
<https://software.intel.com/content/www/us/en/develop/articles/intel-mkl-link-line-advisor.html>
• Execute the compiler using the output from the previous step
1.3 Linking with Intel MKL
For a quick guide on how to use the link line advisor for generating link lines and compiler options for the Thunder/Thunder Prime cluster, the
following can be used:
• Go to Intel Math [Kernel Library Link Line Advisor](https://software.intel.com/content/www/us/en/develop/articles/intel-mkl-link-lineadvisor.html)
• Set "Select Intel product:" to "oneMKL 2021"
• Set "Select OS:" to "Linux*"
• Set "Select compiler:" to "Intel(R) [LANGUAGE] Classic"
• Set "Select architecture:" to "Intel(R) 64"
• Set "Select dynamic or static linking:" to
– "Static" to include libraries in executable
– "Dynamic" to use libraries separately from executable (recommended)
• Set "Select interface layer:" to
– "32-bit integer" if your integer values do not exceed 2^31 (i.e., 2 billion)
– "64-bit integer" otherwise or when in doubt
• Set "Select threading layer:" to
[– "OpenMP threading](https://software.intel.com/content/www/us/en/develop/documentation/mkl-linux-developer-guide/top/managingperformance-and-memory/improving-performance-with-threading/openmp-threaded-functions-and-problems.html) " if using OpenMP
[– "TBB threading](https://software.intel.com/content/www/us/en/develop/documentation/mkl-linux-developer-guide/top/managing-performanceand-memory/improving-performance-with-threading/functions-threaded-with-intel-threading-building-blocks.html) " if using Intel TBB (TBB
is not covered in this tutorial)
– "Sequential" otherwise
• If applicable, set "Select OpenMP library" to appropriate library: "Intel(R) (libiomp5)"
• If applicable, set "Select cluster library" to appropriate libraries (not commonly used)
• If applicable, set "Select MPI library" to appropriate library (not commonly used)
• If applicable, set "Select the Fortran 95 interfaces" to appropriate interfaces (not commonly used)
• Select "Link with Intel(R) MKL libraries explicitly:" if explicitly loading libraries with pointers (not recommended)
• Append your compiler command with the link line and compiler options.
2. Examples using Intel MKL: C
2.1 Dot product(sequential)
For our first C example we [will be using the cblas_sdot](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developerreference-c/top/blas-and-sparse-blas-routines/blas-routines/blas-level-1-routines-and-functions/cblas-sdot.html#cblas-sdot) routine, which
[computes a vector-vector dot product](https://en.wikipedia.org/wiki/Dot_product) [with double precision](https://en.wikipedia.org/wiki/Doubleprecision_floating-point_format) .
With the knowledge that we require a dot product operation, we could find our MKL routine with the following procedure:
• Navigate [to the C Developer Reference](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top.html)
• Noticing our problem domain is basic linear algebra, we click on the BLAS
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/blas-and-sparse-blas-routines.html> link.
• Noticing our problem involves vector-vector operations, we click on the BLAS Level 1 Routines
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/blas-and-sparse-blas-routines/blas-routines/blaslevel-1-routines-and-functions.html#blas-level-1-routines-and-functions> link.
• Searching for dot product on this page we find 4 routines. We choose cblas_?sdot
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/blas-and-sparse-blas-routines/blas-routines/blaslevel-1-routines-and-functions/cblas-sdot.html#cblas-sdot> because we want double precision and we are not using conjugated vectors.
This routine uses one dimensional arrays as inputs, where the data members can be optionally offset. In our example, we will have an x array
with an offset of 2, and a y array with an offset of 1. Using ? to represent information we don’t care about, our arrays will look like the following:
x in memory (offset of 2)
------------------------------------
| 2 | ? | 2 | ? | 2 | ? | 2 | ? | 2
x logically
--------------------
| 2 | 2 | 2 | 2 | 2
y in memory and logically (offset of 1)
--------------------
| 1 | 1 | 1 | 1 | 1
For a refresher on dot products. It is an operation that takes 2 vectors of equal size and outputs a scalar.
x • y
2*1 + 2*1 + 2*1 + 2*1 + 2*1 = 10
With this in mind, our C code will look like the following. We are using dynamically allocated arrays here, with malloc and free. These allocate
and deallocate memory, respectively.
mkl_sdot.c
#include <stdio.h>
#include <stdlib.h>
/ MKL interface
#include "mkl.h"
int main()
{
    // MKL_INT variables for MKL routine
    MKL_INT num_elements, inc_x, inc_y, x_len, y_len;
    int i;
    float result;
    float *x, *y;
    num_elements = 5;
    inc_x = 2;
    inc_y = 1;
    // Include space for offsets of array elements
    x_len = (1 + ((num_elements - 1) * abs(inc_x)));
    y_len = (1 + ((num_elements - 1) * abs(inc_y)));
    // Allocate memory for arrays
    x = (float*)malloc(x_len * sizeof(float));
    y = (float*)malloc(y_len * sizeof(float));
    // Initialize arrays
    for (i = 0; i < num_elements; i++) {
        x[i * abs(inc_x)] = 2.0;
        y[i * abs(inc_y)] = 1.0;
    }
    // Run MKL routine
    result = cblas_dsdot(num_elements, x, inc_x, y, inc_y);
    // Print result
    printf("DOT PRODUCT = %7.3f\n", result);
    // Free memory
    free(x);
    free(y);
    return 0;
}
Using the above link line advisor guide, we can get the following code by inputting sequential for our threading layer. No additional libraries or
interfaces need to be selected. This example can be compiled and linked with OpenMP threading for implicit parallelization, but it is important
to note that sequential execution is an option.
Link line:
-L${MKLROOT}/lib/intel64 -lpthread -lm -ldl
Compiler options:
-DMKL_ILP64  -mkl=sequential
Appending these to our compiler command, we get:
On Thunder:
```bash
     $ module load intel/2021.1.1
     $ icc mkl_sdot.c -o exe_mkl_sdot_c  -L${MKLROOT}/lib/intel64 -lpthread -lm -ldl -DMKL_ILP64 -mkl=sequential
```

On Thunder Prime:
```bash
     $ module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
     $ icc mkl_sdot.c -o exe_mkl_sdot_c  -L${MKLROOT}/lib/intel64 -lpthread -lm -ldl -DMKL_ILP64 -mkl=sequential
```

Here is our job script:
mkl_sdot_c.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N job_mkl_sdot_c
#PBS -l select=1:mem=1gb:ncpus=1
#PBS -l walltime=08:00:00
#PBS -W group_list=x-ccast-prj-[GROUP_NAME]
```

## load Intel to link with Intel MKL
##On Thunder using module load intel/2021.1.1
##On Thunder Prime, replace below line into module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
```bash
module load intel/2021.1.1
cd $PBS_O_WORKDIR
```

./exe_mkl_sdot_c
exit 0
Submit the job:
```bash
$ qsub mkl_sdot_c.pbs
```

Output the results:
```bash
$ cat job_mkl_sdot_c.o[JOB_ID]
```

DOT PRODUCT = 10.000
2.2 Dot product(implicit parallelism)
Use the Intel Math [Kernel Library Link Line Advisor](https://software.intel.com/content/www/us/en/develop/articles/intel-mkl-link-lineadvisor.html)  again, but this time set "Select threading layer:" to "OpenMP threading" and "Select OpenMP library:" to "Intel(R) (libiomp5)"; see
below. The link line is now:
-L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl
and the compiler options are:
-DMKL_ILP64  -mkl=parallel
Now, let’s look at all of our commands again with this change.
On Thunder:
```bash
     $ module load intel/2021.1.1
$ icc mkl_sdot.c -o exe_mkl_sdot_c   -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -DMKL_ILP64 -mkl=parallel
```

On Thunder Prime:
```bash
     $ module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
$ icc mkl_sdot.c -o exe_mkl_sdot_c   -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -DMKL_ILP64 -mkl=parallel
```

We now can run the executable on more than one CPU core (on a single compute node!). Modify the “#PBS -l” line in the job submission script
as the following:
```bash
#PBS -l select=1:mem=2gb:ncpus=4:ompthreads=4
```

Submit the job and view the output:
```bash
$ qsub mkl_sdot_c.pbs
$ cat job_mkl_sdot_c.o[JOB_ID]
```

DOT PRODUCT = 10.000
2.3 Eigenvalue problem
In this next [example, we solve an eigenproblem](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors) . This is done with Intel’s syev
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/lapack-routines/lapack-least-squares-andeigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines/symmetric-eigenvalue-problems-lapack-driverroutines/syev.html> routine. Using the same logic that we used in the dot product example, here is how we would find this routine:
• Navigate [to the C Developer Reference](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top.html)
• We [see eignenvalues under the LAPACK](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-referencec/top/lapack-routines.html) heading, so we click on the cooresponding link.
• Looking under the LAPACK routines, we see the Least Squares and Eigenvalue Problems LAPACK Routines
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/lapack-routines/lapack-least-squares-andeigenvalue-problem-routines.html> link, and click on it.
• Understanding that we want a complete solution to a problem and not a distinct computational task, we click on Driver Routines
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/lapack-routines/lapack-least-squares-andeigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines.html> .
• Realizing we are dealing with symmetric matrices, we click on Symmetric EigenProblems
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/lapack-routines/lapack-least-squares-andeigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines/symmetric-eigenvalue-problems-lapack-driverroutines.html> .
[• We click on syev](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-c/top/lapack-routines/lapack-leastsquares-and-eigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines/symmetric-eigenvalue-problems-lapack-driverroutines/syev.html#syev) because it computes all eigenvalues and eigenvectors of a real symmetric matrix.
From Intel’s website, we have the following description for this routine: The routine computes all eigenvalues and, optionally, eigenvectors of an
n-by-n real symmetric matrix A. The eigenvector v(j) of A satisfies
A*v(j) = lambda(j)*v(j)
where lambda(j) is its eigenvalue. The computed eigenvectors are orthonormal.

## Input Matrix

    ----------------------------------------
    |  1.96 | -6.49 | -0.47 | -7.20 | -0.65
    ----------------------------------------
    | -6.49 |  3.80 | -6.39 |  1.50 | -6.34
    ----------------------------------------
    | -0.47 | -6.39 |  4.17 | -1.51 |  2.67
    ----------------------------------------
    | -7.20 |  1.50 | -1.51 |  5.70 |  1.80
    ----------------------------------------
    | -0.65 | -6.34 |  2.67 |  1.80 | -7.10
Eigenvalues
    ------------------------------------------
    | -11.07 | -6.23 |  0.86 |  8.87 |  16.09
Eigenvectors (stored columnwise)
    -----------------------------------------
    |  0.30 | -0.61 | -0.40 | -0.37 | -0.49
    -----------------------------------------
    |  0.51 | -0.29 |  0.41 | -0.36 |  0.61
    -----------------------------------------
    |  0.08 | -0.38 |  0.66 |  0.50 | -0.40
    -----------------------------------------
    |  0.00 | -0.45 | -0.46 |  0.62 |  00.46
    -----------------------------------------
    |  0.80 |  0.45 | -0.17 |  0.31 | -0.16
Now here’s the code. We are using macros with #define to enable us to use fixed length arrays (not dynamically allocated). These are evaluated
at compile time (as opposed to run time) and are thus much more performant. This also enables us to use list initialization
<https://en.cppreference.com/w/cpp/language/list_initialization> to easily visualize what we are working with.
mkl_ssyev.c
#include <stdlib.h>
#include <stdio.h>
#include "mkl.h"
#define ROWS 5
#define COLUMNS 5
int main() {
    // integer identifier to specify row or column major
    int i,j;
    int matrix_layout;
    lapack_int rows, columns, info;
    // character to specify job information
    char jobz, uplo;
    // use MKL macro
    matrix_layout = LAPACK_ROW_MAJOR;
    // macro for fixed length array
    // row major
    rows = ROWS;
    columns = COLUMNS;
    // describes returned results
    // 'N' to compute eigenvalues only
    // 'V' to compute eigenvalues and eigenvectors
    jobz = 'V';
    // describes the matrix A
    // 'U' for uppertriangular matrix
    // 'L' for lowertriangular matrix
    uplo = 'L';
    float eigenvalues[columns];
    // list initialization, row major
    float a[ROWS * COLUMNS] = {
        1.96,  0.00,  0.00,  0.00,  0.00,
        -6.49,  3.80,  0.00,  0.00,  0.00,
        -0.47, -6.39,  4.17,  0.00,  0.00,
        -7.20,  1.50, -1.51,  5.70,  0.00,
        -0.65, -6.34,  2.67,  1.80, -7.10
    };
    // run MKL routine
    info = LAPACKE_ssyev(matrix_layout, jobz, uplo, columns, a, rows, eigenvalues);
    // if (info == 0) the execution was successful
    // if (info == -i), the i-th parameter had an illegal value
    // if (info == i), then the algorithm failed to converge; i elements did not converge to zero
    if (info != 0) {
        printf( "The algorithm failed to compute eigenvalues.\n" );
        return 1;
    }
    // print eigenvalues
    printf( "Eigenvalues\n" );
    printf("----------------------------------------\n");
    for (i = 0; i < columns; i++) {
        printf( "|%6.2f ", eigenvalues[i] );
    }
    printf("\n");
    printf("\n");
    // print eigenvectors
    printf( "Eigenvectors (stored columnwise)\n" );
    for (i = 0; i < rows; i++) {
        printf("----------------------------------------\n");
        for (j = 0; j < columns; j++)
        {
            printf( "|%6.2f ", a[i + (j * rows)] );
        }
        printf( "\n" );
    }
    return 0;
}
This time when we use the link line advisor; the only difference is that we select OpenMP threading for our threading layer. Notice the - mkl=parallel this time in our compiler options.
Link line:
-L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl
Compiler options:
-DMKL_ILP64  -mkl=parallel
Compilation and linking:
On Thunder:
```bash
     $ module load intel/2021.1.1
$ icc mkl_ssyev.c -o exe_mkl_ssyev_c -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -DMKL_ILP64 -mkl=parallel
```

On Thunder Prime:
```bash
     $ module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
$ icc mkl_ssyev.c -o exe_mkl_ssyev_c -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -DMKL_ILP64 -mkl=parallel
```

Next, for our job script:
mkl_ssyev_c.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N job_mkl_ssyev_c
#PBS -l select=1:mem=2gb:ncpus=4:ompthreads=4
#PBS -l walltime=08:00:00
#PBS -W group_list=x-ccast-prj-[GROUP_NAME]
```

##On Thunder using module load intel/2021.1.1
##On Thunder Prime, replace below line into module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
```bash
module load intel/2021.1.1
cd $PBS_O_WORKDIR
```

## "time" is added to time the calculation
echo "Executed at: $(date)"
time ./exe_mkl_ssyev_c
echo "Finished at: $(date)"
exit 0
Submit the job:
```bash
$ qsub mkl_ssyev_c.pbs
```

Output the results:
```bash
$ cat job_mkl_ssyev_c.o[JOB_ID]
```

Eigenvalues
----------------------------------------
|-11.07 | -6.23 |  0.86 |  8.87 | 16.09
Eigenvectors (stored columnwise)
----------------------------------------
|  0.30 |  0.51 |  0.08 |  0.00 |  0.80
----------------------------------------
| -0.61 | -0.29 | -0.38 | -0.45 |  0.45
----------------------------------------
| -0.40 |  0.41 |  0.66 | -0.46 | -0.17
----------------------------------------
| -0.37 | -0.36 |  0.50 |  0.62 |  0.31
----------------------------------------
| -0.49 |  0.61 | -0.40 |  0.46 | -0.16
3.Examples using Intel MKL: Fortran
3.1 Dot product(sequential)
We would follow the same path in the Fortran documentation to find our routine: Fortran Developer Reference
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top.html> -> BLAS
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top/blas-and-sparse-blas-routines.html> -> BLAS
[Level 1 Routines](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top/blas-and-sparse-blasroutines/blas-routines/blas-level-1-routines-and-functions.html#blas-level-1-routines-and-functions) -> ?sdot
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top/blas-and-sparse-blas-routines/blasroutines/blas-level-1-routines-and-functions/sdot.html#sdot>
Here are our arrays and logical computation again:
x in memory (offset of 2)
------------------------------------
| 2 | ? | 2 | ? | 2 | ? | 2 | ? | 2
x logically
--------------------
| 2 | 2 | 2 | 2 | 2
y in memory and logically (offset of 1)
--------------------
| 1 | 1 | 1 | 1 | 1
x • y
2*1 + 2*1 + 2*1 + 2*1 + 2*1 = 10
Here is the same program in Fortran. Using dynamically allocated arrays again with allocate and deallocate.
mkl_sdot.f90
program mkl_sdot
    !! MKL interface
    include "mkl.fi"
    integer :: num_elements, incx, incy, len_x, len_y, i
    real :: result
    !! dynamically allocated arrays of 1 dimension
    real, dimension(:), allocatable :: x, y
    num_elements = 5
    incx = 2
    incy = 1
    !! Include space for offsets of array elements
    len_x = 1 + ((num_elements - 1) * abs(incx))
    len_y = 1 + ((num_elements - 1) * abs(incy))
    !! allocate memory for arrays
    allocate( x(len_x) )
    allocate( y(len_y) )
    !! initialize arrays
    do i = 0, num_elements
        x(1 + (i * abs(incx))) = 2.0e0
        y(1 + (i * abs(incy))) = 1.0e0
    end do
    !! run MKL routine
    result = sdot(num_elements, x, incx, y, incy)
    !! print result
    print '(a14, f7.3)', 'DOT PRODUCT = ', result
    !! free memory
    deallocate(x)
    deallocate(y)
end program mkl_sdot
Using the link line advisor in a similar fashion, we obtain:
Link line:
-L${MKLROOT}/lib/intel64 -lpthread -lm -ldl
Compiler options:
-i8  -mkl=sequential
All together we have:
On Thunder:
```bash
     $ module load intel/2021.1.1
$ ifort mkl_sdot.f90 -o exe_mkl_sdot_f90 -L${MKLROOT}/lib/intel64 -lpthread -lm -ldl -i8 -mkl=sequential
```

On Thunder Prime:
```bash
     $ module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
$ ifort mkl_sdot.f90 -o exe_mkl_sdot_f90 -L${MKLROOT}/lib/intel64 -lpthread -lm -ldl -i8 -mkl=sequential
```

Our job script:
mkl_sdot_f90.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N job_mkl_sdot_f90
#PBS -l select=1:mem=1gb:ncpus=1
#PBS -l walltime=08:00:00
#PBS -W group_list=x-ccast-prj-[GROUP_NAME]
```

## load Intel to link with Intel MKL
##On Thunder using module load intel/2021.1.1
##On Thunder Prime, replace below line into module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
```bash
module load intel/2021.1.1
cd $PBS_O_WORKDIR
```

./exe_mkl_sdot_f90
exit 0
Submit the job:
```bash
$ qsub mkl_sdot_f90.pbs
```

Output the results:
```bash
$ cat job_mkl_sdot_f90.o[JOB_ID]
```

DOT PRODUCT = 10.000
3.2 Dot product(implicit parallelism)
Use the Intel Math [Kernel Library Link Line Advisor](https://software.intel.com/content/www/us/en/develop/articles/intel-mkl-link-lineadvisor.html)  again, but this time set "Select threading layer:" to "OpenMP threading" and "Select OpenMP library:" to "Intel(R) (libiomp5)"; see
below. The link line is now:
-L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl
and the compiler options are:
-i8  -mkl=parallel
So we have:
On Thunder:
```bash
     $ module load intel/2021.1.1
$ ifort mkl_sdot.f90 -o exe_mkl_sdot_f90 -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -i8 -mkl=parallel
```

On Thunder Prime:
```bash
     $ module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
$ ifort mkl_sdot.f90 -o exe_mkl_sdot_f90 -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -i8 -mkl=parallel
```

We now can run the executable on more than one CPU core (on a single compute node!). Modify the “#PBS -l” line in the job submission script
as the following:
```bash
#PBS -l select=1:mem=2gb:ncpus=4:ompthreads=4
```

Submit the job and view the output:
```bash
$ qsub mkl_sdot_f90.pbs
$ cat job_mkl_sdot_f90.o[JOB_ID]
```

DOT PRODUCT = 10.000
3.3 Eigenvalue problem
Steps for finding our routine [in Fortran: Fortran Developer Reference](https://software.intel.com/content/www/us/en/develop/documentation/mkldeveloper-reference-fortran/top.html) [-> LAPACK](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-referencefortran/top/lapack-routines.html) -> Least Squares and Eigenvalue Problems LAPACK Routines
<[https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top/lapack-routines/lapack-least-squares-andeigenvalue-problem-routines.html> -> Driver Routines](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-referencefortran/top/lapack-routines/lapack-least-squares-and-eigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines.html) -
[> Symmetric EigenProblems](https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top/lapackroutines/lapack-least-squares-and-eigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines/symmetric-eigenvalueproblems-lapack-driver-routines.html#symmetric-eigenvalue-problems-lapack-driver-routines) -> syev
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top/lapack-routines/lapack-least-squares-andeigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines/symmetric-eigenvalue-problems-lapack-driverroutines/syev.html#syev>
Here are our inputs and outputs again for reference:

## Input Matrix

----------------------------------------
|  1.96 | -6.49 | -0.47 | -7.20 | -0.65
----------------------------------------
| -6.49 |  3.80 | -6.39 |  1.50 | -6.34
----------------------------------------
| -0.47 | -6.39 |  4.17 | -1.51 |  2.67
----------------------------------------
| -7.20 |  1.50 | -1.51 |  5.70 |  1.80
----------------------------------------
| -0.65 | -6.34 |  2.67 |  1.80 | -7.10
Eigenvalues
------------------------------------------
| -11.07 | -6.23 |  0.86 |  8.87 |  16.09
Eigenvectors (stored columnwise)
-----------------------------------------
|  0.30 | -0.61 | -0.40 | -0.37 | -0.49
-----------------------------------------
|  0.51 | -0.29 |  0.41 | -0.36 |  0.61
-----------------------------------------
|  0.08 | -0.38 |  0.66 |  0.50 | -0.40
-----------------------------------------
|  0.00 | -0.45 | -0.46 |  0.62 |  00.46
-----------------------------------------
|  0.80 |  0.45 | -0.17 |  0.31 | -0.16
The Fortran routine requests us to explicitly provide the working array. We arbitrarily provide it half our total RAM as our maximum working
memory. To get the optimal working memory, according to the documentation
<https://software.intel.com/content/www/us/en/develop/documentation/mkl-developer-reference-fortran/top/lapack-routines/lapack-least-squares-andeigenvalue-problem-routines/lapack-least-squares-and-eigenvalue-problem-driver-routines/symmetric-eigenvalue-problems-lapack-driverroutines/syev.html#syev> , we can make a call to the syev routine with a work length of -1. Our optimal work length is provided in the first entry of
the work array, and we take the minimum of that and our maximum working length.
Last note is that we initialize our array with reshape [and Fortran is column major](https://en.wikipedia.org/wiki/Row-_and_column-major_order) by
default. Thus for our array to match visually what we see in the initialization, we must transpose it with transpose.
mkl_ssyev.f90
program mkl_ssyev
    include "mkl.fi"
    integer :: columns, rows, work_len_max, info, work_len, i, j
    !! character to specify job information
    character*1 :: jobz, uplo
    !! dynamically allocated arrays of 2 dimensions
    real, dimension(:, :), allocatable :: a
    !! dynamically allocated arrays of 1 dimension
    real, dimension(:), allocatable :: eigenvalues, work
    !! column major
    columns = 5
    rows = columns
    !! .5GB of floating points, 4 bytes a floating point
    work_len_max = floor(.5 * 1024 * 1024 * 1024 / 4)
    !! describes returned results
    !! 'N' to compute eigenvalues only
    !! 'V' to compute eigenvalues and eigenvectors
    jobz = 'V'
    !! describes the matrix a
    !! 'U' for uppertriangular matrix
    !! 'L' for lowertriangular matrix
    uplo = 'L'
    !! allocate memory for arrays
    allocate( a(rows, columns) )
    allocate( eigenvalues(columns) )
    allocate( work(work_len_max) )
    !! initialize array, fortran is column major
    !! transpose to match visual representation
    a = transpose(reshape((/ &
        1.96, 0.00, 0.00, 0.00, 0.00, &
        -6.49, 3.80, 0.00, 0.00, 0.00, &
        -0.47, -6.39, 4.17, 0.00, 0.00, &
        -7.20, 1.50,-1.51, 5.70, 0.00, &
        -0.65,-6.34, 2.67, 1.80, -7.10 &
        /), (/rows, columns/)))
    !! query MKL for optimal workspace
    !! optimal workspace is placed in first index of work array
    work_len = -1
    call ssyev( jobz, uplo, rows, a, columns, eigenvalues, work, work_len, info )
    work_len = min( work_len_max, int( work( 1 ) ) )
    !! run MKL routine
    call ssyev( jobz, uplo, rows, a, columns, eigenvalues, work, work_len, info )
    !! if (info == 0) the execution was successful
    !! if (info == -i), the i-th parameter had an illegal value.
    !! if (info == i), then the algorithm failed to converge; i elements did not converge to zero
    if ( info /= 0 ) then
        print '(A43)', 'The algorithm failed to compute eigenvalues'
        !! Terminate program
        stop
    end if
    !! print eigenvalues
    print '(A11)','Eigenvalues'
    print '(a40)','----------------------------------------'
    write(*, '(*(a, F6.2, 1x))') ( '|', eigenvalues( i ), i = 1, columns )
    print *
    !! print eigenvectors
    print '(A32)','Eigenvectors (stored columnwise)'
    do i = 1, rows
        print '(a40)','----------------------------------------'
        write(*, '(*(a, F6.2, 1x))') ('|', a( i, j ), j = 1, columns )
    end do
    !! free memory
    deallocate(a)
    deallocate(eigenvalues)
    deallocate(work)
end program mkl_ssyev
Using OpenMP threading for our threading layer again. Link lines and compiler commands are:
Link line:
-L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl
Compiler options:
-i8  -mkl=parallel
Compilation and linking:
On Thunder:
```bash
     $ module load intel/2021.1.1
$ ifort mkl_ssyev.f90 -o exe_mkl_ssyev_f90 -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -i8 -mkl=parallel
```

On Thunder Prime:
```bash
     $ module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
$ ifort mkl_ssyev.f90 -o exe_mkl_ssyev_f90 -L${MKLROOT}/lib/intel64 -liomp5 -lpthread -lm -ldl -i8 -mkl=parallel
```

Our job script:
mkl_ssyev_f90.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N job_mkl_ssyev_f90
#PBS -l select=1:mem=3gb:ncpus=4:ompthreads=4
#PBS -l walltime=08:00:00
#PBS -W group_list=x-ccast-prj-[GROUP_NAME]
```

##On Thunder using module load intel/2021.1.1
##On Thunder Prime, replace below line into module load intel-parallel-studio/cluster.2020.4-gcc-vcxt
```bash
module load intel/2021.1.1
cd $PBS_O_WORKDIR
```

## "time" is added to time the calculation
echo "Executed at: $(date)"
time ./exe_mkl_ssyev_f90
echo "Finished at: $(date)"
exit 0
Submit the job:
```bash
$ qsub mkl_ssyev_f90.pbs
```

Output the results:
```bash
$ cat job_mkl_ssyev_f90.o[JOB_ID]
```

Eigenvalues
----------------------------------------
|-11.07 | -6.23 |  0.86 |  8.87 | 16.09
Eigenvectors (stored columnwise)
----------------------------------------
|  0.30 | -0.61 | -0.40 | -0.37 | -0.49
----------------------------------------
|  0.51 | -0.29 |  0.41 | -0.36 |  0.61
----------------------------------------
|  0.08 | -0.38 |  0.66 |  0.50 | -0.40
----------------------------------------
|  0.00 | -0.45 | -0.46 |  0.62 |  0.46
----------------------------------------
|  0.80 |  0.45 | -0.17 |  0.31 | -0.16
4. Miscellaneous
4.1 Helpful Commands
• List modules : module avail
• Load module : module load [MODULE_NAME]
• Unload module: module unload [MODULE_NAME]
• Submit job: qsub [PBS_FILE]
• Check the status of your jobs: qstat -u [USER_NAME]
• Execute the last command starting with [COMMAND]: ![COMMAND]
4.2Why Isn’t MyProgramWorking?
Things to check if your program isn’t running:
• Did you load the Intel module?
• Have you compiled and linked the code properly?
• Is the syntax correct?

## See Also

[CCAST User Guide](https://kb.ndsu.edu/page.php?id=107680)
Keywords:
ccast, hpc, thunder, intel, computing, parallel, "parallel computing", parallelism, "implicit parallelism", "openmp,
mpi, hybrid, c, fortran, "math library", "intel mkl", mkl, oneAPI
Suggest keywords
Doc ID: 107848
Owned by: Khang H. in NDSU IT Knowledge Base
Created: 2020-12-15
Updated: 2023-06-01
Sites: NDSU IT Knowledge Base
Clean URL: https://kb.ndsu.edu/it/intel-mkl
[Helpful 1 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=107848)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=107848)
