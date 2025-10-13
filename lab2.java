import java.util.Scanner;

class Student {
    String usn;
    String name;
    int[] credits;
    int[] marks;
    int n;  // Number of subjects

    // Constructor to initialize number of subjects
    Student(int n) {
        this.n = n;
        credits = new int[n];
        marks = new int[n];
    }

    // Method to accept student details
    void accept() {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter USN: ");
        usn = sc.nextLine();

        System.out.print("Enter Name: ");
        name = sc.nextLine();

        System.out.println("Enter credits and marks for " + n + " subjects:");

        for (int i = 0; i < n; i++) {
            System.out.print("Subject " + (i + 1) + " credits: ");
            credits[i] = sc.nextInt();

            System.out.print("Subject " + (i + 1) + " marks (0-100): ");
            marks[i] = sc.nextInt();
        }
    }

    // Method to calculate grade points from marks
    int getGradePoint(int mark) {
        if (mark >= 90) return 10;
        else if (mark >= 80) return 9;
        else if (mark >= 70) return 8;
        else if (mark >= 60) return 7;
        else if (mark >= 50) return 6;
        else if (mark >= 40) return 4;
        else return 0;
    }

    // Method to calculate SGPA
    double calculateSGPA() {
        int totalCredits = 0;
        int weightedPoints = 0;

        for (int i = 0; i < n; i++) {
            int gp = getGradePoint(marks[i]);
            weightedPoints += gp * credits[i];
            totalCredits += credits[i];
        }

        if (totalCredits == 0) return 0.0;

        return (double) weightedPoints / totalCredits;
    }

    // Method to display student details
    void display() {
        System.out.println("\nStudent Details:");
        System.out.println("USN: " + usn);
        System.out.println("Name: " + name);
        System.out.println("Credits and Marks:");
        for (int i = 0; i < n; i++) {
            System.out.println("Subject " + (i + 1) + ": Credits = " + credits[i] + ", Marks = " + marks[i]);
        }
        System.out.printf("SGPA: %.2f\n", calculateSGPA());
    }
}

public class lab2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of subjects: ");
        int subjects = sc.nextInt();

        Student s = new Student(subjects);
        s.accept();
        s.display();

        sc.close();
    }
}

