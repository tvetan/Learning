from sklearn import tree


def main():
    features = [[140, 1], [130, 1], [150, 0], [170, 0]]
    labels = [0, 0, 1, 1]
    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(features, labels)
    print(clf.predict([[200, 1]]))


main()
